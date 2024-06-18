import React from "react";
import Banner from "./_components/Banner";
import Avatar from "@/components/Avatar";
import { IoIosMore } from "react-icons/io";
import Button from "@/components/Button";
import InterestBadge from "./_components/InterestBadge";

// TODO: Finish the profile page

const ProfilePage = () => {
  return (
    <div className="bg-white">
      {/* ----------------------- HEADER ------------------------ */}
      <div className="pb-4 border border-gray-300">
        {/* BANNER */}
        <Banner
          src="https://utfs.io/f/21242073-30d9-4fac-9d14-6f7a25f02af5-wpzxag.jpg"
          alt="cover"
        />

        {/* AVATAR, NAME, BUTTON */}
        <div className="flex_between flex-row relative px-14 md:px-40 lg:px-60">
          <div className="flex flex_center gap-1">
            <div className="bg-primary-500 inline-flex rounded-full p-1 m-6 mt-[-30px] shadow-lg">
              <Avatar
                src="https://utfs.io/f/62161c60-f5bf-4f77-807d-a03d81548b1f-tk3r9a.png"
                width={100}
                height={100}
              />
            </div>

            <div>
              <p className="text-2xl font-bold">John Smith</p>
              <p>@johnsmith123</p>
            </div>
          </div>

          <Button>
            <IoIosMore />
          </Button>
        </div>

        {/* INTERESTS SECTION */}
        <div className="px-24 md:px-40 lg:px-60 my-4 flex flex-wrap gap-2">
          <InterestBadge label="Basketball" />
          <InterestBadge label="Computer" />
          <InterestBadge label="Science" />
          <InterestBadge label="Motorycycle" />
        </div>
      </div>

      {/* ---------------- FEED -------------------- */}
      <div className="flex px-24 md:px-40 lg:px-60 py-8">
        <div className="flex-initial hidden md:inline-block md:px-16 ">
          <p>09560561453</p>
          <p>sample@gmail.com</p>
        </div>

        <div className="flex-1">
          <p className="text-lg font-bold mb-8">My Posts</p>
          {/* WRITE POST */}
          <input
            placeholder="What's on your mind?"
            className="w-full p-8 border border-gray-200 rounded-2xl"
          />

          <div className="my-4 flex justify-end">
            <Button>Post</Button>
          </div>
        </div>
        {/* POSTS */}
      </div>
    </div>
  );
};

export default ProfilePage;
