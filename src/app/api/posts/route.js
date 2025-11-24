import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const cat = await searchParams.get("cat");
  const limit = await Number(searchParams.get("limit"));
  const offset = await Number(searchParams.get("offset"));

  console.log("cat: ", cat)
  console.log("limit: ", limit)
  console.log("offset: ", offset)
  if (limit === 0) {
    console.log("nan")
    const query = {
      where: {
        ...(cat && { catId: cat }),
      },
    };

    try {
      const [posts, count] = await prisma.$transaction([
        prisma.post.findMany({
          where: query.where, include: { cat: true }
        }),

        prisma.post.count({ where: query.where }),
      ]);
      return new NextResponse(JSON.stringify({ posts, count }, { status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  }

  if (cat != "") {
    console.log("have cat")
    try {
      const posts = await prisma.post.findMany({
        skip: offset,
        take: limit,
        where: {
          cat: {
            slug: cat,
          },
        },
        include: {
          cat: true,      // nếu muốn lấy thông tin Category kèm theo
        },
      });
      return new NextResponse(JSON.stringify({ posts, count: posts.length, hasMore: offset + limit < posts.length }), {
        status: 200,
      });
    } catch (error) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  }

  // USER: get all blog
  console.log("don't cat")
  const query = {
    where: {
      ...(cat && { catId: cat }),
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        skip: offset,
        take: limit,
        where: query.where, include: { cat: true }
      }),

      prisma.post.count({ where: query.where }),
    ]);
    return new NextResponse(JSON.stringify({ posts, count, hasMore: offset + limit < count }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// CREATE A POST
// export const POST = async (req) => {
//   const session = await getAuthSession();

//   if (!session) {
//     return new NextResponse(
//       JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
//     );
//   }

//   try {
//     const body = await req.json();
//     const post = await prisma.post.create({
//       data: { ...body, userEmail: session.user.email },
//     });

//     return new NextResponse(JSON.stringify(post, { status: 200 }));
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };
export const POST = async (req) => {
  try {
    const body = await req.json();
    const { title, desc, imgUrl, catId, slug } = body;
    console.log("body: ", body);
    // Kiểm tra slug có trùng không
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { message: "Slug already exists" },
        { status: 400 }
      );
    }

    // Tạo mới post
    const newPost = await prisma.post.create({
      data: {
        title,
        desc,
        img: imgUrl,
        catId,
        slug,
        userEmail: "trongdatga@gmail.com",
        //cat: { connect: { slug: catId } },
        //user: { connect: { email: "admin@gmail.com" } },
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    console.error("Error creating post:", err);
    return NextResponse.json(
      { message: "Error creating post" },
      { status: 500 }
    );
  }
};
export async function DELETE(req) {
  const body = await req.json();

  const { id } = body;
  try {
    // Kiểm tra post tồn tại
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Xóa post
    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { message: "Failed to delete post", error: error.message },
      { status: 500 }
    );
  }
}
