"use client"

import type React from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 2. Khởi tạo trạng thái loading (để tránh hiển thị giao diện nhanh khi đang kiểm tra token)

  // 3. Sử dụng useEffect để kiểm tra trạng thái đăng nhập
  useEffect(() => {
    // Trong thực tế, bạn sẽ kiểm tra token trong LocalStorage, SessionStorage, hoặc Cookie ở đây.
    // Ví dụ giả định:
    const token = localStorage.getItem("adminAuth"); 
    
    if (token) {
      // *Thực tế: Bạn cần gọi API để xác thực token là hợp lệ*
      // Ví dụ đơn giản:
      setIsLoggedIn(true);
      console.log(1)
    } else {
      setIsLoggedIn(false);
      console.log(2)
    }

    // Nếu chưa đăng nhập, bạn có thể chuyển hướng người dùng đến trang đăng nhập
    // if (!token) {
    //   router.push('/admin/login'); 
    // } else {
    //   router.push('/admin/dashboard');
    // }
  }, []);
  
  return (
    <div className="flex">
      {/* Sidebar */}
     {isLoggedIn ? <AdminSidebar /> : <></>}

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#1a1a1a] h-[100vh]">
       {isLoggedIn ? <AdminHeader /> : <></>}
        <main
          className="flex-1 p-6"
          style={{ overflow: "auto", height: "calc(100vh - 60px)" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
