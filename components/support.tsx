import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, MessageCircle, Headphones } from "lucide-react"

export function Support() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Hỗ Trợ & Liên Hệ</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Reception Phone */}
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Lễ Tân 24/7</h3>
              <a
                href="tel:+84123456789"
                className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
              >
                +84 123 456 789
              </a>
              <p className="text-sm text-muted-foreground mt-2">Gọi ngay để đặt phòng</p>
            </Card>

            {/* Email */}
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
              <a
                href="mailto:info@qkhotel.com"
                className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors break-all"
              >
                info@qkhotel.com
              </a>
              <p className="text-sm text-muted-foreground mt-2">Gửi yêu cầu của bạn</p>
            </Card>

            {/* Address */}
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Địa Chỉ</h3>
              <p className="text-foreground">
                123 Đường Nguyễn Huệ
                <br />
                Quận 1, TP. Hồ Chí Minh
              </p>
            </Card>

            {/* Hours */}
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full bg-chart-3/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-chart-3" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Giờ Làm Việc</h3>
              <p className="text-foreground">
                Lễ tân: 24/7
                <br />
                Nhà hàng: 6:00 - 23:00
              </p>
            </Card>
          </div>

          {/* Support Options */}
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Headphones className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Cần Hỗ Trợ?</h3>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc và hỗ trợ bạn trong suốt quá
              trình lưu trú.
            </p>

            <div className="space-y-4">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base">
                <Phone className="h-5 w-5 mr-2" />
                Gọi Ngay: +84 123 456 789
              </Button>

              <Button variant="outline" className="w-full h-12 text-base bg-transparent">
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat Với Chúng Tôi
              </Button>

              <Button variant="outline" className="w-full h-12 text-base bg-transparent">
                <Mail className="h-5 w-5 mr-2" />
                Gửi Email
              </Button>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Thời gian phản hồi:</strong> Chúng tôi cam kết phản hồi trong vòng
                30 phút cho mọi yêu cầu hỗ trợ.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
