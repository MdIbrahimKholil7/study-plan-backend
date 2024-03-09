import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";

class StudyController {
  static createStudyPlan = catchAsync(
    async (req: Request, res: Response) => {}
  );
}

export default StudyController;
