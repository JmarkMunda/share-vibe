import React from "react";
import { data } from "../../../../data";
import Post from "./_components/Post";

const getAllPosts = async () => {
  const res = await fetch("https://dummyjson.com/posts");
  const data = await res.json();
};

const Feed = async () => {
  // const posts = await getAllPosts();

  return (
    <div className="flex-1">
      {data.posts.map((item) => (
        <Post key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Feed;
