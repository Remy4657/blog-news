import { toSlug } from "@/utils/common";

export async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
export const getPost = async (page, cat) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?page=${page}&cat=${
      cat || ""
    }`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
export async function getDetailPost(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
export async function updateDetailPost(updatedData) {
  console.log("updatedData: ", updatedData);
  const slug = toSlug(updatedData.title);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updatedData, slug: slug }), // dữ liệu cần update
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}
export async function createPost(createData) {
  console.log("create Data: ", createData);
  const slug = toSlug(createData.title);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...createData, slug: slug }), // dữ liệu cần update
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}
