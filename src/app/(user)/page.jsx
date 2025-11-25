import styles from "./homepage.module.css";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";

export default async function Home({ searchParams }) {
  // const { page } = await searchParams;
  // const currentPage = parseInt(page) || 1;
  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <CardList cat="" />
        <Menu />
      </div>
    </div>
  );
}
