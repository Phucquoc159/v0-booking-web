"use client"
import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import Providers from "./providers"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userData") !== null;
    const routerNoCheck = ["/login", "/register", '/'].includes(pathname);
    console.log(!isLoggedIn && !routerNoCheck);
    if (!isLoggedIn && !routerNoCheck) {
      localStorage.removeItem("userData");
      router.push('/login');
    }
  }, [pathname, router])
  return (
    <html lang="vi">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>{children}</Providers>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
