import React from "react";
import TextInput from "@/components/TextInput";
import { useController } from "react-hook-form";

const TextField = ({ name, control, placeholder }: ITextField) => {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <TextInput
      value={field.value!}
      onChange={field.onChange}
      placeholder={placeholder}
      hasError={!!fieldState.error?.message}
    />
  );
};

export default TextField;
