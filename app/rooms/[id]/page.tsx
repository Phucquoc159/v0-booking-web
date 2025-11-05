import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Users,
  Maximize,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useRoom } from "@/lib/hooks/room"

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const { room, isLoading, isError, error } = useRoom(params.id)

  if (!room) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/#rooms"
          className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Quay lại danh sách phòng</span>
        </Link>
      </div>

      {/* Room Header */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">{room.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="font-semibold text-foreground">{room.rating}</span>
                <span>({room.reviews} đánh giá)</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-5 w-5" />
                <span>{room.capacity} khách</span>
              </div>
              <div className="flex items-center gap-1">
                <Maximize className="h-5 w-5" />
                <span>{room.size}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-emerald-600 border-emerald-600 bg-emerald-50">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              {room.availability}
            </Badge>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <img
              src={room.images[0] || "/placeholder.svg"}
              alt={room.name}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            <img
              src={room.images[1] || "/placeholder.svg"}
              alt={`${room.name} 2`}
              className="w-full h-[192px] object-cover rounded-lg"
            />
            <img
              src={room.images[2] || "/placeholder.svg"}
              alt={`${room.name} 3`}
              className="w-full h-[192px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Mô Tả Phòng</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{room.description}</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Loại giường:</span>
                <span>{room.bedType}</span>
              </div>
            </Card>

            {/* Amenities */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Tiện Nghi Phòng</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {room.amenities.map((amenity, index) => {
                  const Icon = amenity.icon
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{amenity.name}</h3>
                        <p className="text-sm text-muted-foreground">{amenity.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Promotions */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Khuyến Mãi Đặc Biệt</h2>
              <div className="space-y-4">
                {room.promotions.map((promo, index) => (
                  <div key={index} className={`p-5 rounded-lg ${promo.color} text-white relative overflow-hidden`}>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold">{promo.title}</h3>
                        <Badge className="bg-white/20 text-white border-white/30 font-bold text-base px-3">
                          {promo.discount}
                        </Badge>
                      </div>
                      <p className="text-white/90">{promo.description}</p>
                    </div>
                    <div className="absolute -right-8 -bottom-8 opacity-10">
                      <CheckCircle2 className="h-32 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-primary">{room.price}₫</span>
                  <span className="text-muted-foreground">/đêm</span>
                </div>
                <p className="text-sm text-muted-foreground">Đã bao gồm thuế và phí</p>
              </div>

              {/* Booking Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Ngày nhận phòng</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Ngày trả phòng</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Số khách</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <select className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                      <option>1 người lớn</option>
                      <option>2 người lớn</option>
                      <option>3 người lớn</option>
                      <option>4 người lớn</option>
                      <option>5 người lớn</option>
                    </select>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
                Đặt Phòng Ngay
              </Button>

              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span>Miễn phí hủy trong 24h</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span>Xác nhận đặt phòng ngay lập tức</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  <span>Check-in: 14:00 | Check-out: 12:00</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
