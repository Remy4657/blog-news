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
export const getColorCategory = (item) => {
  if (item.toLowerCase() == "góc quán niệm") {
    return "#57c4ff31"
  }
  if (item.toLowerCase() == "truyện ngắn") {
    return "#da85c731"
  }
  if (item.toLowerCase() == "lời phật dạy") {
    return "#7fb88133"
  }
  if (item.toLowerCase() == "phật pháp nhiệm màu") {
    return "#ff795736"
  }
  if (item.toLowerCase() == "an lạc") {
    return "#ffb04f45"
  }
  if (item.toLowerCase() == "sống an vui") {
    return "#5e4fff31"
  }
  return "#fff"
}