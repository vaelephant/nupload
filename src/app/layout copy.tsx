"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import React, { useEffect } from "react"; // 导入 React 和 useEffect

const inter = Inter({ subsets: ["latin"] });
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };


//原程序
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }

//修改为dark模式 的程序/ 修改为dark模式的程序
export default function RootLayout({ 
  children 
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.classList.add('dark'); // 设置默认暗模式
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}