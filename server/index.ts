import Hapi from "@hapi/hapi";
import Lib from "../lib";
import Laabr from "laabr";
import mongoose from "mongoose";
import omit from "lodash/omit";
import config from "../config";

const deployment = async (start: boolean) => {
  const server = new Hapi.Server({
    port: config.PORT || 8000,
    host: "localhost"
  });

  await server.register(
    [
      {
        plugin: Laabr,
        options: {
          colored: true,
          preformatter: (data: any) => {
            data.payload = omit(data.payload, "password");
            return data;
          }
        }
      },
      { plugin: Lib }
    ],
    {
      routes: { prefix: "/api" }
    }
  );

  await server.initialize();

  if (!start) {
    return server;
  }

  await server.start();

  await mongoose.connect(config.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  server.logger().info(`Mongodb connected`);

  return server;
};

if (!module.parent) {
  deployment(true);

  process.on("unhandledRejection", err => {
    throw err;
  });
}

export { deployment };
