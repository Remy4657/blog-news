import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";

const Navbar = () => {
  return (
    <div className="flex">
      <div className={styles.container}>
        <div className={styles.social}>
          <Image src="/facebook.png" alt="facebook" width={24} height={24} />
          <Image src="/instagram.png" alt="instagram" width={24} height={24} />
          <Image src="/tiktok.png" alt="tiktok" width={24} height={24} />
          <Image src="/youtube.png" alt="youtube" width={24} height={24} />
        </div>
        {/* <div className={styles.logo}>Phật giáo</div> */}
        <div className={styles.links}>
          <ThemeToggle />
          <Link href="/" className={styles.link}>
            TRANG CHỦ
          </Link>
          <Link href="/" className={styles.link}>
            VĂN HÓA
          </Link>
          <Link href="/" className={styles.link}>
            VIDEO
          </Link>
          <AuthLinks />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
