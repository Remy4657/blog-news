import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import "github-markdown-css/github-markdown.css";
// @ts-nocheck
import ReactMarkdown from "react-markdown";
// @ts-nocheck
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Comments from "@/components/comments/Comments";
import { getDetailPost } from "@/services/admin";

const DetailPost = async ({ slug }) => {
  const data = await getDetailPost(slug);

  return (
    <div className={styles.flex}>
      <div className={styles.flex_7}>
        <h1 className={styles.title}>{data?.title}</h1>
        <div className={styles.infoContainer}>
          {data?.img && (
            <div className={styles.imageContainer}>
              <Image
                src={data?.img}
                alt=""
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.post}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {data?.desc}
            </ReactMarkdown>
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

export default DetailPost;
