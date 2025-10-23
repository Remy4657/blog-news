"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/app/admin/Sidebar";

export default function NavbarWrapper({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname.includes("/login-admin");

  return <>{isLoginPage ? <>{children}</> : <Sidebar children={children} />}</>;
}
