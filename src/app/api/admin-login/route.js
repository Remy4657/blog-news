import { NextResponse } from "next/server";
import prisma from "@/utils/connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const SECRET_KEY = "super-secret";
export const POST = async (req, res) => {
  try {
    const { email, password } = await req.json();

    // Tìm user trong DB
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    //  Kiểm tra có phải admin không
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Access denied: not admin" },
        { status: 403 }
      );
    }

    // So sánh password (bcrypt)
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }
    // tạo JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "7d" } // hết hạn sau 7 ngày
    );

    //  Đăng nhập thành công → có thể tạo session, JWT, v.v.
    const res = NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
    res.cookies.set("access_token", token, {
      httpOnly: true, // bảo mật, không thể đọc từ JS
      secure: true, // true nếu deploy HTTPS
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 ngày
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
