import User from "@/models/user";
import connectToDb from "@/utils/connectToDb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const data = await req.json();
  const { email, password } = data;
  try {
    await connectToDb();
    const user = await User.findOne({ email });
    console.log("USER: ", user);
    if (!user) {
      const hash = await bcrypt.hash(password, 10);
      await User.create({ ...data, password: hash });
      return NextResponse.json(
        { statusCode: 1, message: "Registered successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { statusCode: 0, message: "User already exists" },
      { status: 409 }
    );
  } catch (error) {
    console.log("[route] Registration error:", error);
    return NextResponse.json(
      { statusCode: 0, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
