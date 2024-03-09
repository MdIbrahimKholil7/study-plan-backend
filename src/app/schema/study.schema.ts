import { Schema, model } from "mongoose";
import { StudySession, StudySessionModel } from "../interface/study.interface";

const studySessionSchema = new Schema<StudySession>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SessionModel = model<StudySession, StudySessionModel>(
  "studySession",
  studySessionSchema
);
export default SessionModel;
