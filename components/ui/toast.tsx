"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { CheckCircle, XCircle } from "lucide-react"

type ToastVariant = "success" | "error"

type Toast = {
  id: number
  message: string
  variant: ToastVariant
}

type ToastContextValue = {
  success: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const push = useCallback((message: string, variant: ToastVariant, duration = 2000) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, variant }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const success = useCallback((message: string, duration?: number) => push(message, "success", duration), [push])
  const error = useCallback((message: string, duration?: number) => push(message, "error", duration), [push])

  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-3 rounded-md border p-3 shadow-lg transition-all
              ${t.variant === "success" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}
            `}
          >
            {t.variant === "success" ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
            <span className="text-sm text-white">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
