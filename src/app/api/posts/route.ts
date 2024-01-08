import Post from "@/models/post";
import connectToDb from "@/utils/connectToDb";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/utils/auth";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDb();
    const data = await Post.find({}, "-__v")
      .populate("author", "-__v")
      .sort({ createdAt: -1 });
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    console.log("GET POSTS ERROR: ", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
