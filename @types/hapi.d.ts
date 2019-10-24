import * as hapi from "@hapi/hapi";
import UserService from "../lib/user/userServices";
import { Service } from "schmervice";

declare module "@hapi/hapi" {
  export interface Request {
    services: () => {
      userService: UserService;
    };
  }
  export interface Server {
    registerService: (service: typeof Service) => Service;
  }
}
