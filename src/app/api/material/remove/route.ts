import { NextResponse } from "next/server";
import Material from "@/models/Material";
import Archive from "@/models/Archive";
import { connectDB } from "@/lib/mongodb";
import { verifyTokenApi } from "@/utils/users/checkToken";

export async function DELETE(req: Request) {
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

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({
        message: "Zəhmət olmasa bütün tələb olunan sahələri doldurun.",
      });
    }

    const findMaterial = await Material.findById(id);
    console.log("findMaterial", findMaterial);

    if (!findMaterial) {
      return NextResponse.json({
        message: "Məhsul tapılmadı.",
      });
    }

    await findMaterial?.remove();

    const archive = await Archive.create({
      username: tokenData?.name,
      message: `Məhsul: ${findMaterial?.materialName} silindi ${findMaterial?.createdAt}`,
    });

    await archive.save();
    console.log("archive", archive);

    return NextResponse.json(archive);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server xətası" }, { status: 500 });
  }
}
