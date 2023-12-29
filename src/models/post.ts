import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema({
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Post = models.Post || mongoose.model("Post", postSchema);

export default Post;
