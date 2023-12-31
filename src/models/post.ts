import mongoose, { Document, Model, Schema, models } from "mongoose";
import { IUserSchema } from "./user";

export interface IPostSchema extends Document {
  body: string;
  author: IUserSchema;
  image?: string;
  createdAt?: Date;
  upadtedAt?: Date;
}

const postSchema = new Schema<IPostSchema>(
  {
    body: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    image: String,
  },
  { timestamps: true }
);

const Post: Model<IPostSchema> =
  models.Post || mongoose.model("Post", postSchema);

export default Post;
