"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function NavbarWrapper({ children }) {
  const pathname = usePathname();
  const shouldHideNavbar = pathname === "/login-admin";

  //   return !shouldHideNavbar ? <Navbar /> : null;
  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {children}
      {!shouldHideNavbar && <Footer />}
    </>
  );
}
