import { IUser } from "./userTypes";
import { RouteHandler } from "../types";

const create: RouteHandler<IUser> = async (request, h) => {
  const { userService } = request.services();

  const token = await userService.createUser(request.payload);

  return h.response({ token }).code(201);
};

const login: RouteHandler<IUser> = async (request, h) => {
  const { userService } = request.services();

  const token = await userService.login(request.payload);

  return { token };
};

export default {
  create,
  login
};
