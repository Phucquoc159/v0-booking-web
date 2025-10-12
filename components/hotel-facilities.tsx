import { Button } from "@/components/ui/button"

export function HotelFacilities() {
  const facilities = [
    {
      title: "PHÒNG NGHỈ",
      image: "/luxury-hotel-room-interior-modern.jpg",
      description:
        "Khám phá không gian nghỉ dưỡng sang trọng với đầy đủ tiện nghi hiện đại tại Pullman Saigon Centre. Mỗi phòng...",
    },
    {
      title: "NHÀ HÀNG & BAR",
      image: "/elegant-restaurant-bar-dining-atmosphere.jpg",
      description:
        "Thưởng thức ẩm thực đa dạng từ các món Á đến Âu tại nhà hàng và quầy bar sang trọng của chúng tôi...",
    },
    {
      title: "MEET/PLAY",
      image: "/hotel-meeting-room-conference-business.jpg",
      description: "Không gian hội nghị chuyên nghiệp và khu vực giải trí hiện đại, phù hợp cho mọi sự kiện của bạn...",
    },
  ]

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facilities.map((facility, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={facility.image || "/placeholder.svg"}
                  alt={facility.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold mb-2">{facility.title}</h3>
                <Button variant="outline" className="w-fit bg-primary hover:bg-primary/90 text-white border-0">
                  Khám phá
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
