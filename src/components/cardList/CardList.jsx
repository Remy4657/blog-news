"use client";
import React from "react";
import { useEffect, useState } from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Image from "next/image";
import Card from "../card/Card";
import { getPost } from "@/services/admin";

const CardList = ({ cat }) => {
  const [listPost, setListPost] = useState([]);
  const [offset, setOffset] = useState(5);
  const [isHasMore, setIsHasMore] = useState(true);
  const limit = 5;
  useEffect(() => {
    const fetchAllPosts = async () => {
      const { posts, count } = await getPost(cat, limit, 0);
      if (count < limit) {
        setIsHasMore(false);
      }
      setListPost(posts);
    };
    fetchAllPosts();
  }, [cat]);
  const handleShowMore = async () => {
    const limit = 5;
    const res = await fetch(
      `/api/posts?cat=${cat || ""}&limit=${limit}&offset=${offset}`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    console.log("data: ", data);
    setListPost((prev) => [...prev, ...data.posts]);
    if (data.hasMore) {
      setOffset(offset + limit);
    } else {
      setIsHasMore(false);
    }
  };

  // const POST_PER_PAGE = 2;
  // const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  // const hasNext = POST_PER_PAGE * page < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}></h1>
      <div>
        {listPost?.map((item) => (
          <Card item={item} key={item.id} />
        ))}
        <div>
          {isHasMore && <button onClick={handleShowMore}>Show more</button>}
        </div>
      </div>
      {/* <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} /> */}
    </div>
  );
};

export default CardList;
