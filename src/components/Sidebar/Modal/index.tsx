import { createPost } from "@/app/actions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { IoImageOutline } from "react-icons/io5";

interface IModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

// TODO: Check out server actions

const Modal = ({ show, setShow }: IModal) => {
  const { data: session } = useSession();

  const handleCreatePost = async (formData: FormData) => {
    const res = await createPost(formData, session);
  };

  return (
    <dialog className={`modal modal-${show ? "open" : "close"}`}>
      <div className="modal-box">
        <div className="flex items-center gap-2">
          <Image
            src="/avatar.png"
            width={50}
            height={50}
            alt="avatar"
            className="rounded-full"
          />
          <div className="leading-5">
            <p className="font-bold">John Smith</p>
            <p className="description">@johnsmith</p>
          </div>
        </div>

        <form action={handleCreatePost}>
          {/* TEXT AREA */}
          <textarea
            name="body"
            className="my-4 textarea w-full border-0 active:outline-none"
            placeholder="What's on your mind?"></textarea>

          <div className="flex_between">
            <button>
              <IoImageOutline />
            </button>
            <button className="btn self-end">Post</button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setShow(false)}>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
