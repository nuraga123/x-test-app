import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  await connectDB();

  const { name, email, password, role } = await req.json();


  
  const existing = await User.findOne({ email });
  if (existing) return new Response("Email already exists", { status: 400 });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role,
  });

  return Response.json({ message: "User created", user });
}
