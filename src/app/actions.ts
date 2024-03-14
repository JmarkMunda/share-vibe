"use server";
import { InputsType } from "@/components/CreateEditPostModal/types";
import Post, { IPostSchema } from "@/models/post";
import User, { IUserSchema } from "@/models/user";
import connectToDb from "@/utils/connectToDb";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { revalidateTag } from "next/cache";
import { UTApi } from "uploadthing/server";

export async function createPost(data: InputsType, session: Session | null) {
  await connectToDb();
  try {
    const user = await User.findOne({ email: session?.user?.email });
    const res = await Post.create({
      ...data,
      author: user._id,
    });

    revalidateTag("posts");
    console.log("Post created successfully", res);
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

export async function register(data: IUserSchema) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify(data),
    });
    const response = await res.json();
    return response;
  } catch (error: any) {
    console.log("[ACTION] Registration error:", error);
  }
}
