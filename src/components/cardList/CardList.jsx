import React from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Image from "next/image";
import Card from "../card/Card";
import { getPost } from "@/services/admin";

const CardList = async ({ page, cat }) => {
  const { posts, count } = await getPost(page, cat);
  console.log("posts list: ", posts, "count: ", count);
  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * page < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}></h1>
      <div>
        {posts?.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
      {/* <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} /> */}
    </div>
  );
};

export default CardList;
