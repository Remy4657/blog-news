import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

// ✅ GET: Lấy 10 bài viết có lượt xem cao nhất
export async function GET() {
  try {
    const topPosts = await prisma.post.findMany({
      orderBy: {
        views: "desc", // sắp xếp giảm dần theo lượt xem
      },
      take: 10, // giới hạn 10 bản ghi
      include: {
        user: true, // lấy thông tin user (nếu cần)
        cat: true, // lấy thông tin category (nếu cần)
      },
    });

    return NextResponse.json(topPosts);
  } catch (error) {
    console.error("GET Top Posts error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
