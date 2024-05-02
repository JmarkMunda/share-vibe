import React from "react";
import { useUploadThing } from "@/utils/uploadthings";
import { UseFormRegister } from "react-hook-form";
import { IUploadButton } from "./types";

const UploadButton = ({ register }: IUploadButton) => {
  return <input {...register("image")} type="file" multiple />;
};

export default UploadButton;
