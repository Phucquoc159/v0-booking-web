import { MapPin, Phone, Mail } from "lucide-react"

export function HotelInfo() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* About Section */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">TỔNG QUAN</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Khách sạn 5 sao sang trọng, tọa điểm đẹp ở trung tâm Quận một của thành phố Hồ Chí Minh. Pullman Saigon
                Centre là nơi lý tưởng cho cả khách du lịch và khách công tác.
              </p>
              <p>
                Khách sạn có 306 phòng nghỉ hiện đại với đầy đủ tiện nghi cao cấp, nhà hàng và quầy bar đẳng cấp quốc
                tế, trung tâm hội nghị và spa sang trọng.
              </p>
              <p>
                Tại Pullman Saigon Centre, chúng tôi mang đến trải nghiệm lưu trú đẳng cấp với dịch vụ tận tâm và chuyên
                nghiệp, đảm bảo kỳ nghỉ của bạn thật sự đáng nhớ.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">Truy cập</h2>
            <div className="bg-card rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Pullman Saigon Centre</h3>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <p>
                    Lầu Tầng Trệt Đến Boulevard, Cao Ông Lãnh Ward,
                    <br />
                    700000 Hồ Chí Minh City
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p>Điện thoại: +84 (0)28 3838 8686</p>
                  <p>Fax: +84 (0)28 3838 8627</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <p>Email: H7488@ACCOR.COM</p>
              </div>

              <button className="text-primary hover:underline text-sm font-medium">Xem bản đồ →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
