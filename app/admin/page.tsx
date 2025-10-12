import { redirect } from "next/navigation"

export default function AdminPage() {
  // In production, check authentication here
  redirect("/admin/dashboard")
}
