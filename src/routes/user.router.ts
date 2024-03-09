import express from "express";
import { UserController } from "../app/controller/user.controller";

const router = express.Router();

router.post("/signup", UserController.createUser);

export default router;
