import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: [true, "Email is required"] },
  username: { type: String, required: [true, "Username is required"] },
  image: String,
});

const User = models.User || model("User", userSchema);

export default User;
