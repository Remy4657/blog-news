import React from "react";
import styles from "./menu.module.css";
import Link from "next/link";
import Image from "next/image";
import MenuPosts from "../menuPosts/MenuPosts";
import MenuCategories from "../menuCategories/MenuCategories";
import { getTopPost } from "@/services/admin";

const Menu = () => {
  // const getAllPosts = async () => {
  //   const res = await getTopPost(null, null);
  //   console.log("res top post: ", res);
  // };
  // React.useEffect(() => {
  //   getAllPosts();
  // }, []);
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}></h2>
      <h1 className={styles.title}></h1>
      <MenuPosts withImage={false} />
      <h2 className={styles.subtitle}>Discover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />
      {/* <h2 className={styles.subtitle}>Chosen by the editor</h2>
      <h1 className={styles.title}>Editors Pick</h1>
      <MenuPosts withImage={true} /> */}
    </div>
  );
};

export default Menu;
