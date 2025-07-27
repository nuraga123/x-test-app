import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, password } = await req.json();

    const user = await User.findOne({ name });

    if (!user) {
      return NextResponse.json(
        { errorMessage: "İstifadəçi tapılmadı" },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { errorMessage: "Şifrə yanlışdır" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      JWT_SECRET!,
      {
        expiresIn: "15m",
      }
    );

    user.token = token;
    await user.save();

    return NextResponse.json({
      message: "Uğurlu giriş",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server xətası" }, { status: 500 });
  }
}
