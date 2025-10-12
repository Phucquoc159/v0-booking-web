import { Header } from "@/components/header"
import { HeroBanner } from "@/components/hero-banner"
import { Amenities } from "@/components/amenities"
import { RoomSuggestions } from "@/components/room-suggestions"
import { Reviews } from "@/components/reviews"
import { Support } from "@/components/support"
import { LocationMap } from "@/components/location-map"
import { Footer } from "@/components/footer"
import { ChatBot } from "@/components/chatbot"

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
