import { Inter } from "next/font/google";
import NavbarWrapper from "@/app/admin/NavbarWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} mdl-js`}>
      <body>
        <NavbarWrapper>{children}</NavbarWrapper>
      </body>
    </html>
  );
}
