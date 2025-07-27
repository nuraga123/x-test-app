import { connectDB } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { errorMessage: "Authorization header missing or invalid" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    console.log("token", token);

    const decoded = jwt.verify(token, JWT_SECRET!);

    if (typeof decoded === "string") {
      return NextResponse.json(
        { errorMessage: "Invalid token" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      valid: true,
      id: decoded.id,
      name: decoded.name,
      role: decoded.role,
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json(
        { errorMessage: "Token expired" },
        { status: 401 }
      );
    } else {
      console.log("Token verification failed", error);
      return NextResponse.json(
        { errorMessage: "Token verification failed" },
        { status: 401 }
      );
    }
  }
}
