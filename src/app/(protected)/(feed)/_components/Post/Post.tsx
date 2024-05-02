"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import { deletePost } from "@/app/actions";
import { IPost } from "./types";
import moment from "moment";
import ConfirmationModal from "@/components/ConfirmationModal";
import toast from "react-hot-toast";
import CreateEditPostModal from "@/components/CreateEditPostModal";
import Menu from "@/components/Menu";
import Avatar from "@/components/Avatar";

const Post = ({ item }: IPost) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const onEditClick = () => {
    setShowEditModal(true);
  };

  const onDeleteClick = () => {
    setShowMenu(true);
  };

  const onReportClick = () => {};

  const menuItems: MenuItemsType[] = [
    {
      label: "Edit",
      onClick: onEditClick,
    },
    {
      label: "Delete",
      onClick: onDeleteClick,
    },
    {
      label: "Report",
      onClick: onReportClick,
    },
  ];

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
              <Avatar src={item.author?.image} />
            </button>
            <div>
              <p className="font-bold">{item.author?.username}</p>
              <p className="description">{moment(item.createdAt).fromNow()}</p>
            </div>
          </div>
          {/* MENU OPTIONS */}
          <Menu items={menuItems} />
        </div>
        {/* Post itself (caption only, image only , caption with photo) */}
        <div className="flex flex-col mt-4 mb-8 w-full">
          {item?.body && <p className="mb-2">{item.body}</p>}

          {/* IMAGES */}
          {!!item?.images?.length && (
            <div className="relative bg-gray-300 rounded-2xl w-full h-[300px]">
              <Image
                src={item?.images[0].url}
                alt="post-image"
                fill
                sizes="(max-width: 768px) 100vw"
                className="object-cover rounded-2xl"
              />

              {item.images?.length > 1 && (
                <div className="bg-gray-300 w-16 h-16 absolute bottom-2 right-2 flex_center">
                  <p className="text-white">{item.images?.length - 1}</p>
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
