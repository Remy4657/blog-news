"use client";
import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
// @ts-nocheck
import ReactMarkdown from "react-markdown";
// @ts-nocheck
import remarkGfm from "remark-gfm";
import Comments from "@/components/comments/Comments";
import { getDetailPost } from "@/services/admin";
import { useState, useEffect } from "react";

const SinglePage = async ({ params }) => {
  const { slug } = params;
  const [data, setData] = useState(null);
  //const data = await getDetailPost(slug);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getDetailPost(slug);
      setData(res);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.flex}>
      <div className={styles.flex_7}>
        <h1 className={styles.title}>{data?.title}</h1>
        <div className={styles.infoContainer}>
          {data?.img && (
            <div className={styles.imageContainer}>
              <Image src={data?.img} alt="" fill className={styles.image} />
            </div>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.post}>
            {/* <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: data?.desc }}
            /> */}
            {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data?.desc}
            </ReactMarkdown> */}
            <div className={styles.comment}>
              <Comments postSlug={slug} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.flex_3}>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
