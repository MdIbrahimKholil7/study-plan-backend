import express from "express";
import { UserController } from "../app/controller/user.controller";
import requestValidator from "../app/middlwares/request_validator";
import StudySessionValidator from "../app/middlwares/validator";

const router = express.Router();

router.post(
  "/signup",
  requestValidator(StudySessionValidator.userSchema),
  UserController.createUser
);
router.post("/login", UserController.loginUser);

export default router;
