"use client";
import { createPost, deleteUploadedImage } from "@/app/actions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { FormEvent, FormEventHandler, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoImageOutline } from "react-icons/io5";
import { UploadButton } from "@/utils/uploadthings";
// import UploadButton from "./UploadButton";
import { UploadFileResponse } from "uploadthing/client";
import { IPostSchema } from "@/models/post";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateEditPostModal, InputsType } from "./types";
import { useUploadThing } from "@/utils/uploadthings";

const CreateEditPostModal = ({
  show,
  setShow,
  editValues,
}: ICreateEditPostModal) => {
  // SESSION
  const { data: session } = useSession();
  // FORM REF
  const ref = useRef<HTMLFormElement | null>(null);
  // LOADING
  const [loading, setLoading] = useState({
    isPosting: false,
    isUploading: false,
  });
  // UPLOAD
  const [text, setText] = useState("");
  const [files, setFiles] = useState<
    UploadFileResponse<{
      uploadedBy: string;
    }>[]
  >([]);
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      alert("upload has begun");
    },
  });

  const resetModal = () => {
    setFiles([]);
    setShow(false);
  };

  // TODO: Fix uploading image using uploadthing (DONE)
  // TODO: clean the code
  // TODO: push this code remotely to track changes

  const handleCreatePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading((prev) => ({ ...prev, isPosting: true }));
      const fileUrls = files.map((file) => file.url);
      const data = {
        body: text,
        images: fileUrls,
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
    } catch (error) {
      console.log("Error creating a post", error);
    }
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
            <p className="description">@{session?.user?.username}</p>
          </div>
        </div>

        <form ref={ref} onSubmit={handleCreatePost}>
          {/* TEXT AREA */}
          <textarea
            onChange={(e) => setText(e.currentTarget.value)}
            className="my-4 textarea w-full border-0 active:outline-none"
            placeholder="What's on your mind?"
          />
          {/* IMAGES */}
          {/* TODO: Fix this */}
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
          {/* UPLOAD IMAGE BUTTON */}
          <div className="flex_between">
            {/* <UploadButton register={register} /> */}
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
                console.log("CLIEND UPLOAD COMPLETE: ", res);
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

export default CreateEditPostModal;
