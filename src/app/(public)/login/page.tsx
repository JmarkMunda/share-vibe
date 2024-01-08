"use client";
import TextInput from "../../../components/TextInput";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [loading, setLoading] = useState({
    isFormLoading: false,
    isGoogleLoading: false,
  });
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setLoading((prev) => ({ ...prev, isGoogleLoading: true }));
    await signIn("google", { callbackUrl: "/feed" });
    setLoading((prev) => ({ ...prev, isGoogleLoading: false }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    if (!email || !password) {
      return toast.error("Please enter the required fields");
    }
    setLoading((prev) => ({ ...prev, isFormLoading: true }));
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading((prev) => ({ ...prev, isFormLoading: false }));
    if (!res?.ok) {
      return toast.error("Please check your credentials and try again");
    }
    router.replace("/feed");
  };

  return (
    <form
      onSubmit={handleLogin}
      className="sm:w-1/4 w-auto glass_card p-8 flex flex-col shadow-xl">
      <h1 className="text-4xl font-bold">Login</h1>
      <div className="flex flex-col gap-4 my-6">
        <TextInput name="email" placeholder="Email address" />
        <TextInput name="password" placeholder="Password" />
      </div>
      <Button
        variant="primary"
        loading={loading.isFormLoading}
        type="submit"
        disabled={loading.isFormLoading || loading.isGoogleLoading}>
        Login
      </Button>
      <div className="flex items-center my-4">
        <div className="bg-gray-300 h-[2px] w-full" />
        <p className="description text-center mx-4">or</p>
        <div className="bg-gray-300 h-[2px] w-full" />
      </div>
      <Button
        variant="secondary"
        loading={loading.isGoogleLoading}
        disabled={loading.isFormLoading || loading.isGoogleLoading}
        onClick={handleGoogleLogin}>
        <span className="mr-2">
          <FcGoogle />
        </span>
        Continue with Google
      </Button>
      <p className="text-center description mt-4">
        Don&apos;t have an account?{" "}
        <span className="text-yellow-500 cursor-pointer hover:text-yellow-600">
          <Link href="/register">Register</Link>
        </span>
      </p>
    </form>
  );
}
