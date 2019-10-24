import { Plugin } from "@hapi/hapi";
import userRoutes from "./userRoutes";
import UserService from "./userServices";

const userPlugin: Plugin<{}> = {
  name: "user",
  version: "1.0.0",
  async register(server) {
    userRoutes.registerRoutes(server);

    server.registerService(UserService);
  }
};

export default userPlugin;
