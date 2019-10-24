declare module "schmervice" {
  import * as hapi from "@hapi/hapi";

  export class Service {
    constructor(server: hapi.Server);
    protected server: hapi.Server;
  }

  var schmervice: hapi.Plugin<{}>;

  export default schmervice;
}
