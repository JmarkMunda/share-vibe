import { generateComponents } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { UTApi } from "uploadthing/server";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();

export const { uploadFiles, useUploadThing } =
  generateReactHelpers<OurFileRouter>();
