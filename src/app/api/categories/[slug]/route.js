import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export async function GET(request, { params }) {
  try {
    const { slug } = params;

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        Posts: true, // nếu bạn muốn lấy luôn các bài Post trong category
      },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("GET Category error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();

    const category = await prisma.category.update({
      where: { id: data.id },
      data: {
        title: data.title,
        img: data.img,
        slug: data.slug,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("UPDATE Category error:", error);
    if (error.code === "P2025") {
      // Prisma error: record not found
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
