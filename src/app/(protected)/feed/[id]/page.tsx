import React from "react";
import Post from "../_components/Post";

interface IPost {
  params: { id: string };
}

const PostPage = ({ params }: IPost) => {
  return (
    <div>
      Post {params.id}
      <Post />
    </div>
  );
};

export default PostPage;
