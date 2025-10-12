import { Card } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "/avatar-male-professional.jpg",
    rating: 5,
    date: "15/03/2024",
    comment: "Khách sạn tuyệt vời! Phòng sạch sẽ, nhân viên thân thiện và chuyên nghiệp. Tôi sẽ quay lại lần sau.",
    room: "Phòng Deluxe",
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "/avatar-female-business.jpg",
    rating: 5,
    date: "12/03/2024",
    comment: "Vị trí thuận tiện, view đẹp, đồ ăn ngon. Dịch vụ 5 sao thực sự xứng đáng với giá tiền.",
    room: "Phòng Suite",
  },
  {
    id: 3,
    name: "Lê Minh C",
    avatar: "/avatar-male-casual.jpg",
    rating: 4,
    date: "10/03/2024",
    comment: "Phòng rộng rãi, tiện nghi đầy đủ. Bể bơi và gym rất tốt. Chỉ có điều bãi đỗ xe hơi nhỏ.",
    room: "Phòng Executive",
  },
  {
    id: 4,
    name: "Phạm Thu D",
    avatar: "/avatar-female-young.jpg",
    rating: 5,
    date: "08/03/2024",
    comment: "Gia đình tôi rất hài lòng với kỳ nghỉ tại đây. Phòng family rất phù hợp cho gia đình có trẻ nhỏ.",
    room: "Phòng Family",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    avatar: "/avatar-male-senior.jpg",
    rating: 5,
    date: "05/03/2024",
    comment: "Đây là lần thứ 3 tôi ở khách sạn này. Luôn hài lòng với chất lượng dịch vụ và sự tận tâm của nhân viên.",
    room: "Phòng Suite",
  },
  {
    id: 6,
    name: "Võ Thị F",
    avatar: "/avatar-female-professional.jpg",
    rating: 4,
    date: "02/03/2024",
    comment: "Khách sạn đẹp, hiện đại. Bữa sáng buffet đa dạng và ngon. Giá cả hợp lý cho chất lượng nhận được.",
    room: "Phòng Deluxe",
  },
]

export function Reviews() {
  const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
  const totalReviews = reviews.length

  return (
    <section id="reviews" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Đánh Giá Từ Khách Hàng</h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-6 w-6 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-3xl font-bold text-foreground">{averageRating}</span>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">Dựa trên {totalReviews}+ đánh giá từ khách hàng</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-primary/20 mb-4" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-foreground mb-4 leading-relaxed">{review.comment}</p>

              {/* Room Type */}
              <p className="text-sm text-muted-foreground mb-4">
                Loại phòng: <span className="font-medium text-foreground">{review.room}</span>
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{review.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
