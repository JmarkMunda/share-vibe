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
import CreateEditPostModal from "@/components/CreateEditPostModal";

interface IPost {
  item: IPostSchema;
}

const Post = ({ item }: IPost) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const onEditPress = () => {
    setShowEditModal(true);
  };

  const onDeletePress = () => {
    setShowMenu(true);
  };

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

          <div className="dropdown dropdown-left">
            <button>
              <HiDotsVertical />
            </button>
            <ul className="menu menu-sm dropdown-content bg-white shadow w-56 rounded-box z-50">
              <li>
                <button onClick={onEditPress}>Edit</button>
              </li>
              <li>
                <button onClick={onDeletePress}>Delete</button>
              </li>
              <li>
                <a>Report</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Post itself (caption only, image only , caption with photo) */}
        <div className="flex flex-col mt-4 mb-8 w-full">
          {item?.body && <p className="mb-2">{item.body}</p>}

          {/* IMAGES */}
          {!!item?.images?.length && (
            <div className="relative mx-2 w-[600px] h-[300px] bg-white">
              <Image
                src={item?.images[0]}
                alt="post-image"
                fill
                className="object-contain rounded-2xl"
              />

              {item.images?.length > 1 && (
                <div className="bg-gray-300 w-16 h-16 absolute bottom-2 right-2 flex_center">
                  <p className="text-white">{item.images?.length}</p>
                </div>
              )}
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
      <CreateEditPostModal
        show={showEditModal}
        setShow={setShowEditModal}
        editValues={item}
      />
    </>
  );
};

export default Post;