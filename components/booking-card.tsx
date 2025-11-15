import { Calendar, Users, MapPin, MoreVertical } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Booking } from "@/lib/mock-data"
import Image from "next/image"

interface BookingCardProps {
  booking: Booking
}

const statusConfig = {
  confirmed: { label: "Đã xác nhận", variant: "default" as const },
  pending: { label: "Chờ xử lý", variant: "secondary" as const },
  "checked-in": { label: "Đang ở", variant: "default" as const },
  completed: { label: "Hoàn thành", variant: "secondary" as const },
  cancelled: { label: "Đã hủy", variant: "destructive" as const },
}

export function BookingCard({ booking }: BookingCardProps) {
  const status = statusConfig[booking.status]

  return (
    <Card className="overflow-hidden bg-card border-border hover:border-primary/50 transition-colors">
      <div className="relative h-48 w-full">
        <Image src={booking.image || "/placeholder.svg"} alt={booking.roomType} fill className="object-cover" />
        <Badge variant={status.variant} className="absolute top-3 right-3">
          {status.label}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg text-card-foreground">{booking.roomType}</h3>
            <p className="text-sm text-muted-foreground">Mã: {booking.id}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
              <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
              <DropdownMenuItem>In hóa đơn</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Hủy đặt phòng</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(booking.checkInDate).toLocaleDateString("vi-VN")} -{" "}
              {new Date(booking.checkOutDate).toLocaleDateString("vi-VN")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{booking.guests} khách</span>
          </div>
          {booking.roomNumber && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Phòng {booking.roomNumber}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Tổng tiền</p>
          <p className="text-lg font-semibold text-primary">{booking.totalPrice.toLocaleString("vi-VN")} ₫</p>
        </div>
        {booking.status === "confirmed" && (
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Check-in Online
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
