"use client";
import { IPostSchema } from "@/models/post";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import moment from "moment";
import ConfirmationModal from "@/components/ConfirmationModal";
import { deletePost } from "@/app/actions";
import toast from "react-hot-toast";

interface IPost {
  item: IPostSchema;
}

const Post = ({ item }: IPost) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleDeletePost = async () => {
    const res = deletePost(item._id);
    await toast.promise(res, {
      loading: "Loading",
      success: "Post deleted",
      error: "Post Deletion failed",
    });
    setShowMenu(false);
  };

  return (
    <>
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
          {/* MENU OPTIONS */}
          <div>
            <button className="dropdown dropdown-end">
              <HiDotsVertical />
              <ul className="menu menu-sm dropdown-content bg-white shadow w-56 rounded-box z-50">
                <li>
                  <a>Edit</a>
                </li>
                <li>
                  <button onClick={() => setShowMenu(true)}>Delete</button>
                </li>
                <li>
                  <a>Report</a>
                </li>
              </ul>
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

      {/* MENU / OPTIONS MODAL */}
      <ConfirmationModal
        title="Confirmation"
        description="Are you sure you want to delete this post?"
        visible={showMenu}
        handleConfirm={handleDeletePost}
        handleCancel={() => setShowMenu(false)}
        confirmText="Delete"
        btnConfirmClassNames="bg-red-500 text-white"
      />
    </>
  );
};

export default Post;
