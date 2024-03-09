import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import StudyService from "../services/study.service";
import httpStatus from "http-status";
import { StudySession } from "../interface/study.interface";
import sendResponse from "../../shared/response";

class StudyController {
  static createStudyPlan = catchAsync(async (req: Request, res: Response) => {
    const result = await StudyService.createStudyPlan(req.body);
    sendResponse<StudySession>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Study session created successfully",
      data: result,
    });
  });
}

export default StudyController;
