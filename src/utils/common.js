import slugify from "slugify";

export const toSlug = (str) => {
  return slugify(str, {
    lower: true,
    locale: "vi",
    strict: true, // loại bỏ ký tự đặc biệt
  });
};
