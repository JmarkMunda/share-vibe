"use server";
import Post from "@/models/post";
import connectToDb from "@/utils/connectToDb";
import { Session } from "next-auth";

export async function createPost(formData: FormData, session: Session | null) {
  const data = {
    body: formData.get("body"),
    author: {
      ...session?.user,
      username: session?.user?.name,
    },
  };

  try {
    await connectToDb();
    await Post.create(data);
    return Promise.resolve(true);
  } catch (error) {
    return error;
  }
}
