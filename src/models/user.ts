import { Schema, model, models } from "mongoose";

export interface IUserSchema {
  id?: string;
  email: string;
  username: string;
  image?: string;
}

export const userSchema = new Schema<IUserSchema>({
  email: { type: String, required: [true, "Email is required"] },
  username: { type: String, required: [true, "Username is required"] },
  image: String,
});

const User = models.User || model("User", userSchema);

export default User;
