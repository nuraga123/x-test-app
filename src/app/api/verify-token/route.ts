// src/app/api/verify-token/route.ts

import { connectDB } from "@/lib/mongodb";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Response.json(
        { errorMessage: "Authorization header missing or invalid" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET!);

    return Response.json({
      valid: true,
      decoded,
    });
  } catch (error: unknown) {
    if (error instanceof jwt.TokenExpiredError) {
      return Response.json({ errorMessage: "Token expired" }, { status: 401 });
    } else {
      console.log("Token verification failed", error);
      return Response.json(
        { errorMessage: "Token verification failed" },
        { status: 500 }
      );
    }
  }
}
