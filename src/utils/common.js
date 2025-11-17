import slugify from "slugify";

export const toSlug = (str) => {
  return slugify(str, {
    lower: true,
    locale: "vi",
    strict: true, // loại bỏ ký tự đặc biệt
  });
};
export const formatDate = (dateString) => {

  // Lấy 10 ký tự đầu tiên: "2025-08-18"
  const datePart = dateString.substring(0, 10);

  // Chuyển sang dd/mm/yyyy
  const [year, month, day] = datePart.split("-");
  const formatted = `${day}/${month}/${year}`;

  return formatted
}
