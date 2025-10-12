import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, Users, Maximize, Wifi } from "lucide-react"
import Link from "next/link"

const rooms = [
  {
    id: 1,
    name: "Phòng Deluxe",
    image: "/deluxe-hotel-room-king-bed.jpg",
    price: "1,500,000",
    rating: 4.8,
    reviews: 124,
    capacity: 2,
    size: "32m²",
    description: "Phòng sang trọng với giường king size và view thành phố tuyệt đẹp",
  },
  {
    id: 2,
    name: "Phòng Suite",
    image: "/luxury-suite-room-living-area.jpg",
    price: "2,800,000",
    rating: 4.9,
    reviews: 89,
    capacity: 4,
    size: "55m²",
    description: "Suite rộng rãi với phòng khách riêng và ban công view biển",
  },
  {
    id: 3,
    name: "Phòng Executive",
    image: "/executive-room-modern-design.jpg",
    price: "2,200,000",
    rating: 4.7,
    reviews: 156,
    capacity: 2,
    size: "42m²",
    description: "Phòng cao cấp dành cho doanh nhân với không gian làm việc",
  },
  {
    id: 4,
    name: "Phòng Family",
    image: "/family-room-two-beds.jpg",
    price: "3,200,000",
    rating: 4.9,
    reviews: 203,
    capacity: 5,
    size: "65m²",
    description: "Phòng gia đình rộng rãi với 2 phòng ngủ và khu vực sinh hoạt chung",
  },
]

export function RoomSuggestions() {
  return (
    <section id="rooms" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Gợi Ý Phòng Nghỉ</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Khám phá các loại phòng được thiết kế tinh tế với đầy đủ tiện nghi hiện đại
          </p>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              {/* Room Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={room.image || "/placeholder.svg"}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-card px-3 py-1 rounded-full shadow-lg">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-semibold text-foreground">{room.rating}</span>
                  </div>
                </div>
              </div>

              {/* Room Info */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-foreground mb-2">{room.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{room.description}</p>

                {/* Room Features */}
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{room.capacity} khách</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize className="h-4 w-4" />
                    <span>{room.size}</span>
                  </div>
                  <Wifi className="h-4 w-4" />
                </div>

                {/* Reviews */}
                <div className="text-sm text-muted-foreground mb-4">{room.reviews} đánh giá</div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">{room.price}₫</span>
                    <span className="text-sm text-muted-foreground">/đêm</span>
                  </div>
                  <Link href={`/rooms/${room.id}`}>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Xem Chi Tiết</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
