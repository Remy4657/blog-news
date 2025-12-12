"use client";
import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { formatDate } from "@/utils/common";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const Card = ({ item }) => {
  return (
    <div className={styles.container}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image
            src={item.img}
            alt=""
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
      <div className={styles.textContainer}>

        <Link href={`/detail-post/${item.slug}`}>
          <h3>{item.title}</h3>
          <span className={styles.date}>{formatDate(item.createdAt)}</span>
        </Link>

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}>{item?.desc.slice(0, 240) + "..."}</ReactMarkdown>
        <Link href={`/detail-post/${item.slug}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
