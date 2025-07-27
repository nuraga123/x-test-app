import { NextResponse } from "next/server";
import Material from "@/models/Material";
import Archive from "@/models/Archive";
import { connectDB } from "@/lib/mongodb";
import { verifyTokenApi } from "@/utils/users/checkToken";

export async function POST(req: Request) {
  try {
    await connectDB();

    const tokenData = await verifyTokenApi(req);

    console.log("tokenData", tokenData);

    if (!tokenData) {
      return NextResponse.json(
        {
          message: "Zəhmət olmasa bütün tələb olunan sahələri doldurun.",
        },
        { status: 400 }
      );
    }

    const { materialName, code, unit, price } = await req.json();

    if (!materialName || !unit || !price || !code) {
      return NextResponse.json({
        message: "Zəhmət olmasa bütün tələb olunan sahələri doldurun.",
      });
    }

    const existingMaterial = await Material.findOne({ materialName });

    if (existingMaterial) {
      return NextResponse.json({
        message: `Məhsul: ${materialName} artıq mövcuddur!`,
      });
    }

    const newMaterial = await Material.create({
      materialName,
      code,
      unit,
      price,
    });

    const archive = await Archive.create({
      username: tokenData?.name,
      message: `Məhsul: ${newMaterial?.materialName} yaratıldı ${newMaterial?.createdAt}`,
    });

    await archive.save();
    console.log("archive", archive);

    return NextResponse.json(newMaterial);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server xətası" }, { status: 500 });
  }
}
