import express from "express";
const router = express.Router();
import UserRoute from "./user.router";
import StudyRoute from "./study_planner.route";
const routerModule = [
  {
    path: "/user",
    route: UserRoute,
  },
  {
    path: "/study",
    route: StudyRoute,
  },
];

routerModule.forEach((route) => router.use(route.path, route.route));

export default router;
