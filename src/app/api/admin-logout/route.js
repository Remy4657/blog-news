import { NextResponse } from "next/server";

export async function POST() {
  // Tạo response mới
  const response = NextResponse.json({ message: "Logout successful" });

  // Xóa cookie (đặt lại rỗng và hết hạn ngay)
  response.cookies.set("access_token", "", {
    httpOnly: true,
    expires: new Date(0), // hết hạn ngay
    path: "/", // áp dụng toàn site
  });

  return response;
}
