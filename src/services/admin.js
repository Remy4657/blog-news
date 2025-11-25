import { toSlug } from "@/utils/common";

export const getPost = async (cat, limit, offset) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?cat=${cat || ""}&limit=${limit}&offset=${offset}`,
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
export async function deletePost(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }), // dữ liệu cần update
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}
export const getTopPost = async (page, cat) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/top`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
// CATEGORY
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
export async function getDetailCategory(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
export async function updateDetailCategory(updatedData) {
  const slug = updatedData.slug;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${slug}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updatedData }), // dữ liệu cần update
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}
