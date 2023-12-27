import React from "react";

const getAllPosts = async () => {
  const res = await fetch("https://dummyjson.com/posts");
  const data = await res.json();
};

const Feed = async () => {
  const posts = await getAllPosts();

  return <div className="flex-1">Feed</div>;
};

export default Feed;
