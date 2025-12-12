import Link from "next/link";
import Image from "next/image";
import React from "react";
import styles from "./menuCategories.module.css";
import { getCategories } from "@/services/admin";
import { getColorCategory } from "@/utils/common";

const MenuCategories = async () => {
  const data = await getCategories();


  return (
    <div className={styles.categoryList}>
      {data?.map((item, index) => (
        <Link
          href={`/blog?cat=${item.slug}`}
          className={`${styles.categoryItem}`}
          key={item.id}
          style={{
            backgroundColor: `${getColorCategory(item.title)}`
          }}
        >
          {item.img && (
            <Image
              src={item.img}
              alt=""
              width={32}
              height={32}
              className={styles.image}
            />
          )}
          {item.title}
        </Link>
      ))
      }

    </div >
  );
};

export default MenuCategories;
