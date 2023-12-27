import React, { InputHTMLAttributes } from "react";

interface ITextInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function TextInput({ label, ...props }: ITextInput) {
  return (
    <div>
      {label && <p>{label}</p>}
      <input
        className="py-2 px-4 w-full border-gray-300 rounded-lg focus:border-yellow-500 border-2 outline-none"
        {...props}
      />
    </div>
  );
}
