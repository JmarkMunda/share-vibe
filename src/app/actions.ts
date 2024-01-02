"use server";
import Post, { IPostSchema } from "@/models/post";
import User from "@/models/user";
import connectToDb from "@/utils/connectToDb";
import { Session } from "next-auth";
import { revalidateTag } from "next/cache";
import { UTApi } from "uploadthing/server";

export async function createPost(
  data: { body: string; image: string | null },
  session: Session | null
) {
  await connectToDb();
  try {
    const user = await User.findOne({ email: session?.user?.email });
    await Post.create({
      ...data,
      author: user._id,
    });

    revalidateTag("posts");
  } catch (error) {
    console.log("Error creating post: ", error);
  }
}

export async function deletePost(id: string) {
  try {
    await connectToDb();
    await Post.findByIdAndDelete(id);
    revalidateTag("posts");
  } catch (error) {
    console.log("Error deleting post: ", error);
  }
}

export async function deleteUploadedImage(files: string[]) {
  const utapi = new UTApi();
  await utapi.deleteFiles(files);
}
