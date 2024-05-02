import { InputHTMLAttributes } from "react";

type FormValuesType = {
  confirmPassword: string;
} & IUserSchema;

interface ITextField extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control?: Control<FieldValues>;
  placeholder?: string;
}
