import Image from "next/image";
import React from "react";

const RightSideBar = () => {
  return (
    <section className="glass_card w-72 h-screen p-10">
      <h3 className="my-4 uppercase">Friends</h3>
      {/* List */}
      <div className="flex items-center">
        <Image
          src={"/avatar.png"}
          alt="avatar"
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className="mx-2">John Cruz</p>
      </div>
    </section>
  );
};

export default RightSideBar;
