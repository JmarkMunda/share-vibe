"use client";
import { createPost, deleteUploadedImage } from "@/app/actions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { RefObject, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoImageOutline } from "react-icons/io5";
import { UploadButton } from "@/utils/uploadthings";
import { UploadFileResponse } from "uploadthing/client";
import { IPostSchema } from "@/models/post";

interface IModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ show, setShow }: IModal) => {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement | null>(null);
  const [files, setFiles] = useState<
    UploadFileResponse<{ uploadedBy: string }>[]
  >([]);
  const [loading, setLoading] = useState({
    isPosting: false,
    isUploading: false,
  });

  const resetModal = () => {
    setFiles([]);
    setShow(false);
  };

  const handleCreatePost = async (formData: FormData) => {
    setLoading((prev) => ({ ...prev, isPosting: true }));
    const data = {
      body: formData.get("body")!.toString(),
      image: files[0]?.url,
    };
    const res = createPost(data, session);
    await toast.promise(res, {
      loading: "Loading",
      success: "Successfully created a post",
      error: "Failed to create a post",
    });
    setLoading((prev) => ({ ...prev, isPosting: false }));
    resetModal();
    ref.current?.reset();
  };

  const handleModalClose = async () => {
    const fileKeys = files.map((file) => file.key);
    if (!!fileKeys.length) await deleteUploadedImage(fileKeys);
    resetModal();
  };

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
            <p className="description">
              @{session?.user?.name?.replace(" ", "").toLowerCase()}
            </p>
          </div>
        </div>

        <form ref={ref} action={handleCreatePost}>
          {/* TEXT AREA */}
          <textarea
            name="body"
            className="my-4 textarea w-full border-0 active:outline-none"
            placeholder="What's on your mind?"></textarea>

          {/* IMAGES */}
          {!!files.length && (
            <div className="flex gap-4 py-4">
              {files.map((file) => (
                <Image
                  key={file.key}
                  src={file.url}
                  alt={file.name}
                  width={100}
                  height={100}
                  className="shadow-md rounded-md"
                />
              ))}
            </div>
          )}

          <div className="flex_between">
            {/* <IoImageOutline className="w-8 h-8 text-blue-500" />; */}
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
                setFiles((prev) => [...prev, ...res]);
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
              disabled={loading.isPosting || loading.isUploading}>
              {loading.isPosting ? (
                <span className="loading loading-spinner text-warning" />
              ) : (
                "Post"
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

export default Modal;
