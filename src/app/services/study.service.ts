import { StudySession } from "../interface/study.interface";
import SessionModel from "../schema/study.schema";

class StudyService {
  static createStudyPlan = async (
    payload: StudySession
  ): Promise<StudySession | null> => {
    const result = await SessionModel.create(payload);
    return result;
  };
}

export default StudyService;
