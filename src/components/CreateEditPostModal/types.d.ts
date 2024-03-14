export type InputsType = {
  body: string;
  images?: string[];
};

export interface ICreateEditPostModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  editValues?: IPostSchema;
}

interface IUploadButton {
  register: UseFormRegister<InputsType>;
}
