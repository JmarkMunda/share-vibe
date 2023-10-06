"use client";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { data: session } = useSession();

  const handleLogin = () => {
    signIn("google", { callbackUrl: "/home" });
  };

  const handleLogout = () => {
    if (!session) return;
    signOut();
  };

  console.log("Session:", session);

  return (
    <div className="sm:w-1/4 w-auto glass_card">
      <div className="flex flex-col ">
        <h1 className="text-4xl font-bold my-4">Login</h1>
        <div className="my-2">
          <TextInput placeholder="Email address" />
        </div>
        <div className="my-2">
          <TextInput placeholder="Password" />
        </div>
        <Button
          variant="primary"
          loading={false}
          onClick={handleLogout}
          className="mt-6">
          {!session ? "Login" : "Logout"}
        </Button>
        <div className="flex items-center my-4">
          <div className="bg-gray-300 h-[2px] w-full" />
          <p className="description text-center mx-4">or</p>
          <div className="bg-gray-300 h-[2px] w-full" />
        </div>
        <Button variant="secondary" loading={false} onClick={handleLogin}>
          <span className="mr-2">
            <FcGoogle />
          </span>
          Continue with Google
        </Button>
        <p className="text-center description mt-4">
          Don&apos;t have an account?{" "}
          <span className="text-yellow-500 cursor-pointer hover:text-yellow-600">
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
