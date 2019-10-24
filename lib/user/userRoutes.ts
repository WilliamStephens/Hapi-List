import { Server, ServerRoute } from "@hapi/hapi";
import userController from "./userController";
import { userJoiSchema, jwtResponseSchema } from "./userModel";

const routes: ServerRoute[] = [
  {
    method: "POST",
    path: "/users",
    handler: userController.create,
    options: {
      tags: ["api", "users"],
      validate: {
        payload: userJoiSchema,
        failAction: (request, h, error) => {
          throw error;
        }
      },
      auth: false,
      response: { status: { 201: jwtResponseSchema } }
    }
  },
  {
    method: "POST",
    path: "/users/authenticate",
    handler: userController.login,
    options: {
      tags: ["api", "users"],
      validate: {
        payload: userJoiSchema,
        failAction: (request, h, error) => {
          throw error;
        }
      },
      auth: false,
      response: { status: { 200: jwtResponseSchema } }
    }
  }
];

const registerRoutes = (server: Server) => {
  server.route(routes);
};

export default {
  registerRoutes
};
