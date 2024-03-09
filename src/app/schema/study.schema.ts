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
      enum: [1, 2, 3],
      default: 1,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// Pre-save hook to convert hours to minutes
studySessionSchema.pre<StudySession>("save", async function (next) {
  try {
    this.duration = this.duration * 60; //converting into minutes
    next();
  } catch (error: any) {
    next(error); // Explicitly specify the error type
  }
});
const SessionModel = model<StudySession, StudySessionModel>(
  "studySession",
  studySessionSchema
);
export default SessionModel;
