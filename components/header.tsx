"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, User } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">QK</div>
            <div className="text-xl font-semibold text-foreground">Hotel</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#rooms" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Phòng Nghỉ
            </a>
            <a href="#amenities" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Tiện Nghi
            </a>
            <a href="#reviews" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Đánh Giá
            </a>
            <a href="#contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Liên Hệ
            </a>
          </nav>

          {/* Contact & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+84123456789"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>+84 123 456 789</span>
            </a>
            <Link href="/login">
              <Button variant="outline" className="gap-2 bg-transparent">
                <User className="h-4 w-4" />
                Đăng Nhập
              </Button>
            </Link>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Đặt Phòng Ngay</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <a href="#rooms" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Phòng Nghỉ
              </a>
              <a href="#amenities" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Tiện Nghi
              </a>
              <a href="#reviews" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Đánh Giá
              </a>
              <a href="#contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Liên Hệ
              </a>
              <a
                href="tel:+84123456789"
                className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>+84 123 456 789</span>
              </a>
              <Link href="/login">
                <Button variant="outline" className="gap-2 w-full bg-transparent">
                  <User className="h-4 w-4" />
                  Đăng Nhập
                </Button>
              </Link>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">Đặt Phòng Ngay</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
