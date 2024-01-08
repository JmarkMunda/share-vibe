import { Schema, model, models } from "mongoose";

export interface IUserSchema {
  id?: string;
  email: string;
  username: string;
  image?: string;
  name?: string;
  password?: string;
}

export const userSchema = new Schema<IUserSchema>({
  email: { type: String, required: [true, "Email is required"], unique: true },
  username: { type: String, required: false },
  image: { type: String, required: false },
  name: { type: String, required: false },
  password: { type: String, required: false },
});

const User = models.User || model("User", userSchema);

export default User;
