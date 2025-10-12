"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { UtensilsCrossed, Shirt, Car, Coffee, Cookie, Droplet, Sparkles, Clock } from "lucide-react"

const serviceCategories = [
  {
    id: "dining",
    name: "Ăn Uống",
    icon: UtensilsCrossed,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    services: [
      { id: "noodles", name: "Mì Tôm", price: "15,000", icon: UtensilsCrossed },
      { id: "snacks", name: "Snack", price: "20,000", icon: Cookie },
      { id: "water", name: "Nước Suối", price: "10,000", icon: Droplet },
      { id: "breakfast", name: "Buffet Sáng", price: "250,000", icon: Coffee },
    ],
  },
  {
    id: "laundry",
    name: "Giặt Ủi",
    icon: Shirt,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    services: [
      { id: "wash", name: "Giặt Thường", price: "50,000", icon: Shirt, unit: "/kg" },
      { id: "iron", name: "Ủi Quần Áo", price: "30,000", icon: Sparkles, unit: "/bộ" },
      { id: "dryclean", name: "Giặt Khô Cao Cấp", price: "150,000", icon: Shirt, unit: "/bộ" },
      { id: "express", name: "Dịch Vụ Nhanh (2h)", price: "100,000", icon: Clock, unit: "/kg" },
    ],
  },
  {
    id: "transport",
    name: "Đặt Xe",
    icon: Car,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    services: [
      { id: "airport", name: "Đưa Đón Sân Bay", price: "500,000", icon: Car },
      { id: "citytour", name: "Tour Thành Phố", price: "800,000", icon: Car },
      { id: "rental", name: "Thuê Xe Theo Ngày", price: "1,200,000", icon: Car },
      { id: "chauffeur", name: "Xe Riêng Có Tài Xế", price: "2,000,000", icon: Car, unit: "/ngày" },
    ],
  },
]

export function Amenities() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const getTotalPrice = () => {
    let total = 0
    serviceCategories.forEach((category) => {
      category.services.forEach((service) => {
        if (selectedServices.includes(service.id)) {
          total += Number.parseInt(service.price.replace(/,/g, ""))
        }
      })
    })
    return total.toLocaleString("vi-VN")
  }

  const handleBookServices = () => {
    console.log("[v0] Selected services:", selectedServices)
    // Handle booking logic here
    alert(`Đã đặt ${selectedServices.length} dịch vụ. Tổng: ${getTotalPrice()}₫`)
  }

  return (
    <section id="amenities" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tiện Nghi & Dịch Vụ</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chọn các dịch vụ bổ sung để nâng cao trải nghiệm lưu trú của bạn
          </p>
        </div>

        {/* Service Categories */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {serviceCategories.map((category) => {
            const CategoryIcon = category.icon
            return (
              <Card key={category.id} className="p-6 md:p-8">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-full ${category.bgColor} flex items-center justify-center`}>
                    <CategoryIcon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{category.name}</h3>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.services.map((service) => {
                    const ServiceIcon = service.icon
                    const isSelected = selectedServices.includes(service.id)
                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 hover:bg-accent/50"
                        }`}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleService(service.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <ServiceIcon className="h-5 w-5 text-muted-foreground" />
                            <h4 className="font-semibold text-foreground">{service.name}</h4>
                          </div>
                          <p className="text-lg font-bold text-primary">
                            {service.price}₫{service.unit || ""}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Booking Summary */}
        {selectedServices.length > 0 && (
          <Card className="mt-8 p-6 max-w-6xl mx-auto bg-primary/5 border-primary">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Đã chọn {selectedServices.length} dịch vụ</p>
                <p className="text-2xl font-bold text-foreground">
                  Tổng cộng: <span className="text-primary">{getTotalPrice()}₫</span>
                </p>
              </div>
              <Button
                onClick={handleBookServices}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Đặt Dịch Vụ Ngay
              </Button>
            </div>
          </Card>
        )}
      </div>
    </section>
  )
}
