import { IPostSchema } from "@/models/post";

export type ImageType = {
  key: string;
  url: string;
};

export type InputsType = {
  body: string;
  images?: ImageType[];
};

export interface ICreateEditPostModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  editValues?: IPostSchema;
}

export interface IUseCreateEditPost {
  editValues?: IPostSchema;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IUploadButton {
  register: UseFormRegister<InputsType>;
}
