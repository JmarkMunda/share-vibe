import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { IUseCreateEditPost, ImageType } from "../types";
import { createPost, deleteUploadedImage, editPost } from "@/app/actions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const useCreateEditPost = ({ editValues, setShow }: IUseCreateEditPost) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState({
    isPosting: false,
    isUploading: false,
  });
  const [text, setText] = useState(editValues?.body ?? "");
  const [images, setImages] = useState<ImageType[]>(editValues?.images ?? []);
  const invalid = !text && !images.length;
  const isEditing = !!Object.keys(editValues ?? {}).length;

  const handlePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (invalid) return;
    try {
      setLoading((prev) => ({ ...prev, isPosting: true }));
      const data = {
        body: text,
        images,
      };
      const res = !isEditing
        ? createPost(data, session)
        : editPost(editValues?._id, data);
      await toast.promise(res, {
        loading: "Loading",
        success: `Successfully ${isEditing ? "edited" : "created"} a post`,
        error: `Failed to ${isEditing ? "edit" : "create"}  a post`,
      });
      setLoading((prev) => ({ ...prev, isPosting: false }));
      closeModal();
    } catch (error) {
      console.log(`Error ${isEditing ? "editiing" : "creating"} a post`, error);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };

  const handleAddImages = (data: ImageType) => {
    setImages((prev) => [...prev, data]);
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleModalClose = async () => {
    closeModal();
    if (isEditing) return;
    const imageKeys = images.map((image) => image.key);
    if (!!imageKeys.length) await deleteUploadedImage(imageKeys);
    setText("");
    setImages([]);
  };

  const getButtonLabel = () => {
    return isEditing ? "Edit" : "Post";
  };

  return {
    session,
    loading,
    text,
    images,
    invalid,
    setLoading,
    handleOnChange,
    handleAddImages,
    handleModalClose,
    handlePost,
    getButtonLabel,
  };
};

export default useCreateEditPost;
