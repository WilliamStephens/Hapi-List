import { Service } from "schmervice";
import bcrypt from "bcrypt";
import UserModel from "./userModel";
import { IUser } from "./userTypes";
import { generateJWT } from "./userUtils";
import Boom from "@hapi/boom";
import to from "await-to-js";

class UserService extends Service {
  createUser = async (user: IUser) => {
    const { email, password } = user;
    this.server.logger().info(`Attempting to create user`, { email });

    const foundUser = await UserModel.findOne({ email });
    if (foundUser) {
      this.server.logger().info(`Email already exists`, { email });
      throw Boom.badRequest("Email already exists");
    }

    const hashedPassword = await this.hashPassword(password);
    await this.createDatabaseUser({ email, password: hashedPassword });

    this.server.logger().info(`User created successfully`, { email });
    return generateJWT(user);
  };

  login = async (user: IUser) => {
    const { email, password } = user;
    this.server.logger().info(`Attempting to authenticate user`, { email });

    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      this.server.logger().info(`Email not found`, { email });
      throw Boom.unauthorized("Invalid email or password");
    }

    await this.comparePassword(password, foundUser.password);

    this.server.logger().info(`User athenticated successfully`, { email });
    return generateJWT(user);
  };

  private createDatabaseUser = async ({
    email,
    password: hashedPassword
  }: IUser) => {
    this.server.logger().info(`Creating user database record`, { email });
    const newUser = new UserModel({ email, password: hashedPassword });
    const [error] = await to(newUser.save());
    if (error) {
      this.server
        .logger()
        .warn(`Failed to create user database record`, { email });
      throw Boom.badRequest("Failed to create user");
    }
  };

  private hashPassword = async (password: string) => {
    this.server.logger().info(`Hashing password`);
    const [hashError, hashedPassword] = await to(bcrypt.hash(password, 10));
    if (hashError || !hashedPassword) {
      this.server.logger().warn(`Failed to hash password`);
      throw Boom.badRequest(`Failed to hash password`);
    }
    return hashedPassword;
  };

  private comparePassword = async (password: string, passwordHash: string) => {
    this.server.logger().info(`Comparing password to hash`);
    const [error, isAuthenticated] = await to(
      bcrypt.compare(password, passwordHash)
    );
    if (error || !isAuthenticated) {
      this.server.logger().info(`Invalid password`);
      throw Boom.unauthorized(`Invalid email or password`);
    }
  };
}

export default UserService;
