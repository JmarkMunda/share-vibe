import React from "react";
import Post from "./_components/Post";
import { headers } from "next/headers";
import { IPostSchema } from "@/models/post";

const getAllPosts = async () => {
  const headersList = headers();
  const cookie = headersList.get("cookie")!;

  const res = await fetch(`${process.env.BASE_URL}/api/posts`, {
    method: "GET",
    headers: { Cookie: cookie },
    next: { tags: ["posts"] },
  });
  const { data } = await res.json();
  return data;
};

const Feed = async () => {
  const posts: IPostSchema[] = await getAllPosts();

  return (
    <div className="flex-1">
      {posts?.length > 0 ? (
        posts.map((item) => <Post key={item._id} item={item} />)
      ) : (
        <p>No posts</p>
      )}
    </div>
  );
};

export default Feed;
