import mongoose, { Document, Model, Schema, models } from "mongoose";
import { IUserSchema } from "./user";
import { ImageType } from "@/components/CreateEditPostModal/types";

export interface IPostSchema extends Document {
  body: string;
  author: IUserSchema;
  images?: ImageType[];
  createdAt?: Date;
  upadtedAt?: Date;
}

const postSchema = new Schema<IPostSchema>(
  {
    body: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    images: [Schema.Types.Mixed],
  },
  { timestamps: true }
);

const Post: Model<IPostSchema> =
  models.Post || mongoose.model("Post", postSchema);

export default Post;
