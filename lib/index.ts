import { Plugin } from "@hapi/hapi";
import User from "./user";
import Schmervice from "schmervice";
import { registerJWTAuth } from "./auth";
import HapiSwagger from "hapi-swagger";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";

const lib: Plugin<any> = {
  name: "lib",
  version: "1.0.0",
  async register(server) {
    await registerJWTAuth(server);
    await server.register([
      Schmervice,
      User,
      Inert,
      Vision,
      {
        // @ts-ignore
        plugin: HapiSwagger,
        options: {
          info: {
            title: "Test API Documentation",
            version: "1"
          },
          grouping: "tags"
        }
      }
    ]);
  }
};

export default lib;
