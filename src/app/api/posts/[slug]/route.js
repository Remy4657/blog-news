import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { toSlug } from "@/utils/common";

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = await params;
  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
export const PUT = async (req) => {
  try {
    const body = await req.json();
    const { id, title, desc, imgUrl, catSlug, slug } = body;
    console.log("body: ", body);
    // Kiểm tra bài viết có tồn tại không
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    // Cập nhật bài viết
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        desc,
        slug,
        catSlug,
        img: imgUrl,
      },
    });

    return NextResponse.json({ updatedPost, status: 200 });
  } catch (err) {
    console.error("Error updating post:", err);
    return NextResponse.json.stringify(
      { message: "Error updating post" },
      { status: 500 }
    );
  }
};
