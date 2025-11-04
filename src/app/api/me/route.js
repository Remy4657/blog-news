import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/utils/connect";

const SECRET_KEY = process.env.SECRET_KEY || "super-secret-key";

export async function GET(req) {
  try {
    // Lấy cookie từ request
    const token = req.cookies.get("access_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Not logged in" }, { status: 401 });
    }

    // Giải mã token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Tìm user trong database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("Error verifying token:", err);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
