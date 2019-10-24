import {
  ResponseToolkit,
  Lifecycle,
  Request,
  ServerRoute,
  HandlerDecorations
} from "@hapi/hapi";

interface GenericRequest<T extends object> extends Request {
  payload: T;
}

export interface RouteHandler<T extends object> extends HandlerDecorations {
  (request: GenericRequest<T>, h: ResponseToolkit): Lifecycle.ReturnValue;
}
