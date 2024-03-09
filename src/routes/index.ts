import express from "express";
const router = express.Router();
import UserRoute from "./user.router";
const routerModule = [
  {
    path: "/user",
    route: UserRoute,
  },
];

routerModule.forEach((route) => router.use(route.path, route.route));

export default router;
