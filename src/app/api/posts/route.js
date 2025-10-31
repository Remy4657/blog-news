import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  console.log("post no slug");

  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const cat = searchParams.get("cat");
  console.log("cat: ", cat, "page: ", page);
  const POST_PER_PAGE = 2;
  if (page == "null" || cat == "null") {
    try {
      console.log("zo day");
      const posts = await prisma.post.findMany({
        where: {
          ...(cat && { catSlug: cat }),
        },
      });

      return new NextResponse(JSON.stringify({ posts, count: posts.length }), {
        status: 200,
      });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  }

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);
    return new NextResponse(JSON.stringify({ posts, count }, { status: 200 }));
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
    const { title, desc, imgUrl, catSlug, slug } = body;
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
        //catSlug,
        slug,
        cat: { connect: { slug: catSlug } },
        user: { connect: { email: "admin@gmail.com" } },
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
