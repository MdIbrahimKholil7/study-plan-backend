import { Model, Types } from "mongoose";

// Define the interface for the StudySession document
export type StudySession = {
  subject: string;
  duration: number; // in minutes
  priority: number; // 1 to 3 (1 being lowest priority)
  user: Types.ObjectId;
};
export type StudySessionModel = Model<StudySession>;
