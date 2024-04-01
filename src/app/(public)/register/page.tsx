"use client";
import { register } from "@/app/actions";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import Button from "@/components/Button";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import TextField from "./components/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/utils/clientSchemas";

const RegisterPage = () => {
  const [isAgree, setIsAgree] = useState(false);

  const { control, handleSubmit, formState } = useForm<FormValuesType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJkKq_NqCUhC61_dNvvh323yJOM96q0y6XgfbFc42ssr1s=s96-c",
    },
  });

  const handleRegister = async (data: FormValuesType) => {
    if (data) {
      console.log(data);
      return;
    }
    const res = await register(data);
    if (res.statusCode) {
      toast.success(res.message);
      redirect("/login");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="flex flex-1">
      <div className="flex-1">
        <Image
          src={"/register.png"}
          alt="register"
          width={800}
          height={800}
          style={{ objectFit: "cover" }}
        />
        <p className="text-center text-white">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold cursor-pointer hover:opacity-50">
            Login
          </Link>
        </p>
      </div>
      {/* FORM */}
      <div className="flex-1">
        <form className="sm:w-1/2 w-auto glass_card p-8 mx-auto shadow-xl">
          <h1 className="text-3xl font-bold my-4">Register</h1>

          {/* <div className="avatar mb-4">
            <div className="w-20 mask mask-squircle relative">
              <Image
                src="https://utfs.io/f/942a0e9a-8314-475d-bb66-3721e97aa450-tk3r99.png"
                alt="avatar"
                fill
                className="object-contain"
              />
            </div>
          </div> */}

          <div className="flex flex-col gap-4">
            <TextField control={control} name="name" placeholder="Full name" />
            <TextField
              control={control}
              name="email"
              placeholder="Email address"
            />
            <TextField
              control={control}
              name="username"
              placeholder="Username"
            />
            <TextField
              control={control}
              name="password"
              placeholder="Password"
            />
            <TextField
              control={control}
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
          {/* TERMS AND CONDITIONS */}
          <label className="cursor-pointer label my-2">
            <input
              type="checkbox"
              checked={isAgree}
              onChange={() => setIsAgree((prev) => !prev)}
              className="checkbox checkbox-warning"
            />
            <span className="label-text">
              I agree to the terms and conditions
            </span>
          </label>

          <Button
            variant="primary"
            loading={false}
            type="submit"
            className="mt-2"
            onClick={handleSubmit(handleRegister)}
            disabled={!formState.isValid}>
            Register
          </Button>
        </form>
      </div>

      {/* CIRCLE BACKGROUND SHAPES */}
      <div className="fancy_border_radius_1 bg-white bg-opacity-20 w-28 h-28 absolute top-[-20px] left-[-20px]" />
      <div className="fancy_border_radius_1 bg-white bg-opacity-20 w-12 h-12 absolute top-8 left-96" />
      <div className="fancy_border_radius_1 bg-white bg-opacity-20 w-36 h-36 absolute bottom-16 left-24" />
      <div className="rounded-full bg-white bg-opacity-20 w-60 h-60 absolute bottom-0 left-[-100px]" />
    </div>
  );
};

export default RegisterPage;
