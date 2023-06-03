import { Router, RouterOptions } from "express";

export abstract class AppRouter {
  router: Router;
  constructor(options: RouterOptions = {}) {
    this.router = Router(options);
  }
  toExpress = (): Router => {
    return this.router;
  };
}
