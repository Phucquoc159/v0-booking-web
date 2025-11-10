"use client";

import { ToastProvider } from "@/components/ui/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <ToastProvider>
        {children}
      </ToastProvider>
    </QueryClientProvider>
  )
}
