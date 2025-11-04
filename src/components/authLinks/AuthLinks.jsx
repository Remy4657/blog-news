"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import UserMenu from "../userMenu/UserMenu";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);

  const { data: session, status } = useSession();

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          {/* <Link href="/write" className={styles.link}>
            Write
          </Link> */}

          <UserMenu session={session} />
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">TRANG CHỦ</Link>
          <Link href="/">VĂN HÓA</Link>
          <Link href="/">VIDEO</Link>
          {status === "unauthenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              {/* <Link href="/write">Write</Link> */}
              <span className={styles.link}>Logout</span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
