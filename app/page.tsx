import { Header } from "@/components/header"
import { HeroBanner } from "@/components/hero-banner"
import type { Metadata } from "next"
import { Amenities } from "@/components/amenities"
import { RoomSuggestions } from "@/components/room-suggestions"
import { Reviews } from "@/components/reviews"
import { Support } from "@/components/support"
import { LocationMap } from "@/components/location-map"
import { Footer } from "@/components/footer"
import { ChatBot } from "@/components/chatbot"

export const metadata: Metadata = {
  title: "QK Hotel - Khách Sạn Sang Trọng & Hiện Đại",
  description: "Đặt phòng khách sạn QK Hotel - Trải nghiệm dịch vụ 5 sao với giá tốt nhất",
  generator: "v0.app",
}
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      <Amenities />
      <RoomSuggestions />
      <Reviews />
      <Support />
      <LocationMap />
      <Footer />
      <ChatBot />
    </main>
  )
}
