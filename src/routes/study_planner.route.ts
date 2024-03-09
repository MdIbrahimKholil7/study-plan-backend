import express from "express";
import StudyController from "../app/controller/study.controller";
import ensureAuthenticated from "../app/middlwares/authentication";
import requestValidator from "../app/middlwares/request_validator";
import StudySessionValidator from "../app/middlwares/validator";

const router = express.Router();

router.post(
  "/",
  ensureAuthenticated,
  requestValidator(StudySessionValidator.studySessionSchema),
  StudyController.createStudyPlan
);
router.get("/", ensureAuthenticated, StudyController.getStudySession);

export default router;
