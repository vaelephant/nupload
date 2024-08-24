"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import React, { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ 
  children 
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.classList.add('dark'); // 在客户端确保添加 dark 类
  }, []);

  return (
    <html lang="en" className="dark"> {/* 直接添加 dark 类 */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}