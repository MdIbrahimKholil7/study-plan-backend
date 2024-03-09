import { Schema, Model, model } from "mongoose";
import { User } from "../interface/user.interface";
import bcrypt from "bcrypt";
type UserModel = Model<User, object>;

const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// Pre-save hook to hash the password before saving to the database
userSchema.pre<User>("save", async function (next) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // Replace the plain password with the hashed one
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    next(error); // Explicitly specify the error type
  }
});

const UserModel = model<User, UserModel>("User", userSchema);
export default UserModel;
