import { Inter } from "next/font/google";
import NavbarWrapper from "@/app/admin/NavbarWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function PermanentDrawerLeft({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarWrapper children={children} />
      </body>
    </html>
  );
}
