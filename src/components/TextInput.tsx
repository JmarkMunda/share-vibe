import React, { ChangeEvent, InputHTMLAttributes } from "react";

interface ITextInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
}

export default function TextInput({
  label,
  value,
  onChange,
  hasError,
  ...props
}: ITextInput) {
  return (
    <div>
      {label && (
        <p className={`${hasError ? "text-red-500" : "text-black"}`}>{label}</p>
      )}
      <input
        value={value}
        onChange={onChange}
        className={`py-2 px-4 w-full ${
          hasError ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:border-yellow-500 border-2 outline-none`}
        {...props}
      />
    </div>
  );
}
