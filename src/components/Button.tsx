"use client";
import React, { ButtonHTMLAttributes } from "react";
import { DotLoader } from "react-spinners";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  variant,
  disabled,
  loading,
  className,
  children,
  ...props
}: IButton) {
  const baseStyle =
    "px-6 py-3 rounded-lg font-bold flex justify-center items-center";
  const disabledClass =
    disabled && "bg-gray-100 text-gray-300 cursor-not-allowed";
  const btnVariant =
    variant === "primary"
      ? "bg-yellow-200 hover:bg-yellow-300"
      : "border-yellow-300 border-2 text-gray-500 hover:border-yellow-400";

  return (
    <button
      className={`${baseStyle} ${btnVariant} ${disabledClass} ${className}`}
      disabled={disabled}
      {...props}>
      {!loading ? (
        children
      ) : (
        <DotLoader
          color="red"
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </button>
  );
}
