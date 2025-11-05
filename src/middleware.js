import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { signIn, useSession } from "next-auth/react";

export default async function middleware(req) {
  try {
    const path = req.nextUrl.pathname;
    const token = req.cookies.get("access_token")?.value;

    const acceptPagesWithoutLogin = ["/admin/login-admin", "/admin/no-access"];
    const loginPage = ["/admin/login-admin"];

    const isAcceptPagesWithoutLogin = acceptPagesWithoutLogin.includes(path);
    const isLoginPage = loginPage.includes(path);

    const isAdminRoute = path.startsWith("/admin");
    // dang nhap roi thi khong vao login page dc nua
    if (isLoginPage && token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    // chua dang nhap thi bat buoc vao no-access
    if (isAdminRoute && !isAcceptPagesWithoutLogin && !token) {
      return NextResponse.redirect(new URL("/admin/login-admin", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log("error middleware: ", error);
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
