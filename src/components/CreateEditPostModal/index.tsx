"use client";
import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { IoImageOutline } from "react-icons/io5";
import { UploadButton } from "@/utils/uploadthings";
import { ICreateEditPostModal } from "./types";
import useCreateEditPost from "./hooks/useCreatePost";

const CreateEditPostModal = ({
  show,
  setShow,
  editValues,
}: ICreateEditPostModal) => {
  const {
    session,
    text,
    images,
    invalid,
    loading,
    setLoading,
    handleOnChange,
    handleAddImages,
    handleModalClose,
    handlePost,
    getButtonLabel,
  } = useCreateEditPost({
    editValues,
    setShow,
  });

  return (
    <dialog className={`modal modal-${show ? "open" : "close"}`}>
      <div className="modal-box">
        <div className="flex items-center gap-2">
          <Image
            src={session?.user?.image ?? "/avatar.png"}
            width={50}
            height={50}
            alt="avatar"
            className="rounded-full"
          />
          <div className="leading-5">
            <p className="font-bold">{session?.user?.name}</p>
            <p className="description">@{session?.user?.username}</p>
          </div>
        </div>

        <form onSubmit={handlePost}>
          {/* TEXT AREA */}
          <textarea
            value={text}
            onChange={handleOnChange}
            className="my-4 textarea w-full border-0 active:outline-none"
            placeholder="What's on your mind?"
          />
          {/* IMAGES */}
          {/* TODO: Fix this */}
          {!!images.length && (
            <div className="flex gap-4 py-4">
              {images.map((image, index) => (
                <Image
                  key={image.key}
                  src={image.url}
                  alt={`image-${index}`}
                  width={100}
                  height={100}
                  className="shadow-md rounded-md"
                />
              ))}
            </div>
          )}
          {/* UPLOAD IMAGE BUTTON */}
          <div className="flex_between">
            <UploadButton
              endpoint="imageUploader"
              content={{
                button({ ready }) {
                  if (ready)
                    return <IoImageOutline className="w-8 h-8 text-blue-500" />;
                },
              }}
              onUploadProgress={() => {
                setLoading((prev) => ({ ...prev, isUploading: true }));
              }}
              onClientUploadComplete={(res) => {
                handleAddImages({ key: res[0].key, url: res[0].url });
                setLoading((prev) => ({ ...prev, isUploading: false }));
              }}
              onUploadError={(err: Error) => {
                toast.error("Failed to upload image");
                setLoading((prev) => ({ ...prev, isUploading: false }));
              }}
              className="ut-allowed-content:hidden ut-button:w-max ut-button:p-4 ut-button:bg-transparent"
            />
            <button
              type="submit"
              className="btn btn-primary self-end font-extrabold"
              disabled={invalid || loading.isPosting || loading.isUploading}>
              {loading.isPosting ? (
                <span className="loading loading-spinner text-warning" />
              ) : (
                getButtonLabel()
              )}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleModalClose}>close</button>
      </form>
    </dialog>
  );
};

export default CreateEditPostModal;
