export async function getCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
}
export const getPost = async (page, cat) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?page=${page}&cat=${cat || ""}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed");
    }

    return res.json();
};
