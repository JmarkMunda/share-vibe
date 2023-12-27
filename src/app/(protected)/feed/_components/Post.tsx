import Image from "next/image";
import React from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

const Post = () => {
  return (
    <article className="p-8 my-8 glass_card rounded-xl">
      {/* Avatar */}
      <div className="flex justify-between">
        <div className="flex gap-4">
          <button>
            <Image
              src="/avatar.png"
              alt="avatar"
              width={50}
              height={50}
              className="rounded-full "
            />
          </button>
          <div>
            <p className="font-bold">John Doe</p>
            <p className="description">12 minutes ago</p>
          </div>
        </div>
        <div>
          <button>
            <HiDotsVertical />
          </button>
        </div>
      </div>
      {/* Post itself (caption only, image only , caption with photo) */}
      <div className="my-4 w-full h-[350px]">
        <p className="mb-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa illo
          beatae distinctio esse atque id consequuntur tempore. Obcaecati,
          molestias eius!
        </p>
        <div className="relative w-full h-4/5">
          <Image
            src="/img-post.jpg"
            alt="post-image"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      </div>
      {/* reactions, comments, share */}
      <div className="flex_evenly ">
        <button className="flex_center gap-2 px-4 py-2 rounded-md hover:bg-primary-300">
          <span>
            <AiFillLike />
          </span>
          Like
        </button>
        <button className="flex_center gap-2 px-4 py-2 rounded-md hover:bg-primary-300">
          <span>
            <FaComment />
          </span>
          Comment
        </button>
        <button className="flex_center gap-2 px-4 py-2 rounded-md hover:bg-primary-300">
          <span>
            <FaShare />
          </span>
          Share
        </button>
      </div>
    </article>
  );
};

export default Post;
