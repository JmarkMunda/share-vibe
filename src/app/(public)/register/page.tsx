"use client";
import { register } from "@/app/actions";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { IUserSchema } from "@/models/user";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const handleRegister = async (e: FormData) => {
    const data: IUserSchema = {
      name: e.get("fullname")!.toString(),
      email: e.get("email")!.toString(),
      username: e.get("username")!.toString(),
      password: e.get("password")!.toString(),
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJkKq_NqCUhC61_dNvvh323yJOM96q0y6XgfbFc42ssr1s=s96-c",
    };
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
      <div className="flex-1"></div>
      {/* FORM */}
      <div className="flex-1">
        <form
          action={handleRegister}
          className="sm:w-1/2 w-auto glass_card p-8 mx-auto shadow-xl">
          <h1 className="text-4xl font-bold my-4">Register</h1>

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
            <TextInput name="fullname" placeholder="Full name" />
            <TextInput name="email" placeholder="Email address" />
            <TextInput name="username" placeholder="Username" />
            <TextInput name="password" placeholder="Password" />
            <TextInput name="confirm-password" placeholder="Confirm Password" />
          </div>
          {/* TERMS AND CONDITIONS */}
          <label className="cursor-pointer label my-2">
            <input
              type="checkbox"
              checked={true}
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
            className="mt-6">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
