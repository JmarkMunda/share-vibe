import { IPostSchema } from "@/models/post";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import moment from "moment";

interface IPost {
  item: IPostSchema;
}

const Post = ({ item }: IPost) => {
  return (
    <article className="flex flex-col p-8 my-8 glass_card rounded-xl">
      {/* Avatar */}
      <div className="flex justify-between">
        <div className="flex gap-4">
          <button>
            <Image
              src={item.author?.image ?? "/avatar.png"}
              alt="avatar"
              width={50}
              height={50}
              className="rounded-full "
            />
          </button>
          <div>
            <p className="font-bold">{item.author?.username}</p>
            <p className="description">{moment(item.createdAt).fromNow()}</p>
          </div>
        </div>
        <div>
          <button>
            <HiDotsVertical />
          </button>
        </div>
      </div>
      {/* Post itself (caption only, image only , caption with photo) */}
      <div className="flex flex-col my-4 w-full">
        {item?.body && <p className="mb-2">{item.body}</p>}
        {item?.image && (
          <div className="relative w-full h-[300px]">
            <Image
              src={item.image}
              alt="post-image"
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        )}
      </div>
      {/* Brief details (amount of reactions, comments, shares) */}
      <div className="flex_evenly border-b-2 border-gray-100">
        <p className="description">4 likes</p>
        <button className="description">15 comments</button>
        <p className="description">8 shares</p>
      </div>

      {/* reactions, comments, share */}
      <div className="flex_evenly">
        <button className="flex_center gap-2 px-4 py-2 rounded-md hover:bg-primary-300">
          <span>
            <AiFillLike />
          </span>
          Like
        </button>
        <Link href={`/feed/${item?.id}`}>
          <button className="flex_center gap-2 px-4 py-2 rounded-md hover:bg-primary-300">
            <span>
              <FaComment />
            </span>
            Comment
          </button>
        </Link>
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
