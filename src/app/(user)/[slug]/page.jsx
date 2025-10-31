import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import { getDetailPost } from "@/services/admin";

const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getDetailPost(slug);

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
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: data?.desc }}
            />
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
