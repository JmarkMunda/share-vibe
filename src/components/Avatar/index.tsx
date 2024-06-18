import Image from "next/image";
import React from "react";

const Avatar = ({
  src = "/avatar.png",
  width = 50,
  height = 50,
  className,
  ...props
}: IAvatar) => {
  return (
    <Image
      src={src}
      alt="avatar"
      width={width}
      height={height}
      className={`rounded-full ${className}`}
      {...props}
    />
  );
};

export default Avatar;
