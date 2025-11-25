import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

const MenuCategories = () => {
  return (
    <div className={styles.categoryList}>
      <Link
        href="/blog?cat=style"
        className={`${styles.categoryItem} ${styles.style}`}
      >
        Truyện ngắn
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.fashion}`}>
        Lời phật dạy
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.food}`}>
        Phật pháp nhiệm màu
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.travel}`}>
        Góc quán niệm
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.culture}`}>
        Thức tỉnh
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.coding}`}>
        Sống an vui
      </Link>
    </div>
  );
};

export default MenuCategories;
