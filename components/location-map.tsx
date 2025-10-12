import { MapPin, Phone, Mail } from "lucide-react"

export function LocationMap() {
  const address = "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh"
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(address)}`

  return (
    <section id="location" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Vị Trí Khách Sạn</h2>
          <p className="text-muted-foreground text-lg">Tọa lạc tại trung tâm thành phố, thuận tiện di chuyển</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Địa Chỉ</h3>
                  <p className="text-muted-foreground leading-relaxed">{address}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Điện Thoại</h3>
                  <p className="text-muted-foreground">+84 123 456 789</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">Hỗ trợ 24/7</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Email</h3>
                  <p className="text-muted-foreground">info@qkhotel.com</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">Phản hồi trong 24h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden border border-border shadow-lg h-full min-h-[400px]">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="QK Hotel Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
