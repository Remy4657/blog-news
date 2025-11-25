"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts.module.css";
import { getTopPost } from "@/services/admin";
import { useState } from "react";
import { formatDate } from "@/utils/common";

const MenuPosts = ({ withImage }) => {
  const [listTopPosts, setListTopPosts] = useState([]);
  const getTopPosts = async () => {
    const res = await getTopPost(null, null);
    console.log("res: ", res);
    setListTopPosts(res);
  };
  React.useEffect(() => {
    getTopPosts();
  }, []);
  return (
    <div className={styles.items}>
      {listTopPosts.map((item, index) => {
        return (
          <Link
            href={`/detail-post/${item.slug}`}
            className={styles.item}
            key={item.id}
          >
            {withImage && (
              <div className={styles.imageContainer}>
                <Image
                  src="/p1.jpeg"
                  alt=""
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
            <div className={styles.textContainer}>
              <span className={`${styles.category} ${styles.travel}`}>
                {item.cat.title}
              </span>
              <h3 className={styles.postTitle}>{item.title}</h3>
              <div className={styles.detail}>
                {/* <span className={styles.username}>John Doe</span> */}
                <span className={styles.date}>
                  {formatDate(item.createdAt)}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MenuPosts;
