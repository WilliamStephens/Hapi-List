import { Server, ResponseToolkit, Request } from "@hapi/hapi";
import HapiJWT from "hapi-auth-jwt2";
import to from "await-to-js";
import config from "../config";

export const validate = async (
  decoded: string,
  request: Request,
  h: ResponseToolkit
) => {
  console.log("im here");

  const { userService } = request.services();

  console.log(decoded);
};

export const registerJWTAuth = async (server: Server) => {
  console.log(config.JWT_SECRET_KEY);

  await server.register(HapiJWT);
  server.auth.strategy("jwt", "jwt", {
    validate,
    key: config.JWT_SECRET_KEY
  });
  server.auth.default("jwt");
};
