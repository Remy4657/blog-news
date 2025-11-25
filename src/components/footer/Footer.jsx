import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          {/* <Image src="/logo.png" alt="lama blog" width={50} height={50} /> */}
          <h1 className={styles.logoText}>Phật giáo</h1>
        </div>
        <p className={styles.desc}>
          Với mục đích lan tỏa tinh thần tỉnh thức và lòng từ bi qua những bài
          viết, bài giảng và thực hành thiền. Chúng tôi mong muốn mang lại một
          không gian bình an để mỗi người có thể quay về với chính mình.
        </p>
        <div className={styles.icons}>
          <Image src="/facebook.png" alt="" width={18} height={18} />
          <Image src="/instagram.png" alt="" width={18} height={18} />
          <Image src="/tiktok.png" alt="" width={18} height={18} />
          <Image src="/youtube.png" alt="" width={18} height={18} />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Trang chủ</Link>
          <Link href="/">Văn hóa</Link>
          <Link href="/">VIDEO</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href="/">Chánh niệm</Link>
          <Link href="/">Phật pháp</Link>
          <Link href="/">An lạc</Link>
          <Link href="/">Tỉnh thức</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Tiktok</Link>
          <Link href="/">Youtube</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
