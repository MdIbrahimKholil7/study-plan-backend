import express from "express";
import StudyController from "../app/controller/study.controller";
import ensureAuthenticated from "../app/middlwares/authentication";

const router = express.Router();

router.post("/", ensureAuthenticated, StudyController.createStudyPlan);
router.get("/", ensureAuthenticated, StudyController.getStudySession);

export default router;
