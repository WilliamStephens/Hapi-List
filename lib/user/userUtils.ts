import jwt from "jsonwebtoken";
import { IUser } from "./userTypes";
import config from "../../config";

export const generateJWT = (user: IUser) => {
  return jwt.sign({ email: user.email }, config.JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1h"
  });
};
