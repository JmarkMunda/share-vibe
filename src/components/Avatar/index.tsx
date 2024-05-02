import Image from "next/image";
import React from "react";

const Avatar = ({
  src = "/avatar.png",
  width = 50,
  height = 50,
  ...props
}: IAvatar) => {
  return (
    <Image
      src={src}
      alt="avatar"
      width={width}
      height={height}
      className="rounded-full"
      {...props}
    />
  );
};

export default Avatar;
