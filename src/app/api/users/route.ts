import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const user = await User.find();

    if (!user) {
      return NextResponse.json(
        { errorMessage: "İstifadəçi tapılmadı" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Users error:", error);
    return NextResponse.json({ error: "Server xətası" }, { status: 500 });
  }
}
