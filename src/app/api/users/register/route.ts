import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { IUser } from "@/types/users";

export async function POST(req: Request) {
  await connectDB();

  const { name, email, password, role }: IUser = await req.json();

  const existingEmail = await User.findOne({ email });
  const existingName = await User.findOne({ name });

  if (existingEmail || existingName) {
    return Response.json(
      { errorMessage: "Email və ya ad artıq istifadə olunub" },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    role,
    password: hashed,
    token: "",
  });

  return Response.json({ user });
}
