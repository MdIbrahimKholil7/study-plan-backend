import { StudySession } from "../interface/study.interface";
import SessionModel from "../schema/study.schema";
import { Types } from "mongoose";
class StudyService {
  static createStudyPlan = async (
    payload: StudySession
  ): Promise<StudySession | null> => {
    const result = await SessionModel.create(payload);
    return result;
  };

  static getStudyPlan = async (userId: string): Promise<StudySession[]> => {
    const user = new Types.ObjectId(userId);
    // Define aggregation pipeline to group study sessions by user
    const pipeline = [
      { $match: { user } }, // Match study sessions for the specified user
      { $sort: { priority: -1, duration: -1 } }, // Sort study sessions by priority and duration
      {
        $group: {
          _id: "$user",
          userId: { $first: "$user" },
          studySessions: { $push: "$$ROOT" }, // Push all study sessions for the user into an array
        },
      },
      {
        $project: {
          _id: 0,
          userId: 1,
          studySessions: {
            $map: {
              input: "$studySessions",
              in: {
                subject: "$$this.subject",
                duration: "$$this.duration",
                priority: "$$this.priority",
                createdAt: "$$this.createdAt",
                updatedAt: "$$this.updatedAt",
              },
            },
          }, // Project only the subject, duration, and priority fields from the study sessions
        },
      },
    ] as any;

    // Execute aggregation pipeline
    const studyPlansData = await SessionModel.aggregate<StudySession>(pipeline);

    // If no study plans data found, return an empty array
    if (!studyPlansData || studyPlansData.length === 0) {
      return [];
    }

    return studyPlansData;
  };
}

export default StudyService;
