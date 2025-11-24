import CardList from "@/components/cardList/CardList";
import styles from "./blogPage.module.css";
import Menu from "@/components/Menu/Menu";

const BlogPage = async ({ searchParams }) => {
  const { pageSearchParams } = await searchParams;
  const page = parseInt(pageSearchParams) || 1;

  const { cat } = await searchParams;

  return (
    <div className={styles.container}>
      {/* <h1 className={styles.title}>{cat} Blog</h1> */}
      <span>/category{cat ? `/${cat}` : ""} </span>
      <div className={styles.content}>
        <CardList cat={cat} />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
