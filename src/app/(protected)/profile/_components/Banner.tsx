import React from "react";
import { IBanner } from "../utils/types";
import Image from "next/image";

const Banner = ({ src, alt, containerClassName, ...props }: IBanner) => {
  return (
    <div className={`bg-blue-300 h-52 relative ${containerClassName}`}>
      <Image src={src} alt={alt} fill className="object-cover" {...props} />
    </div>
  );
};

export default Banner;
