"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { GamepadIcon as GameController } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-200",
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <GameController className="h-6 w-6" />
          <span className="font-bold text-xl">레조넌스</span>
        </div>

        <nav className="flex items-center gap-6">
          <Button variant="ghost" onClick={() => scrollToSection("patch-notes")}>
            패치노트
          </Button>
          <Button variant="ghost" onClick={() => scrollToSection("calculator")}>
            강화 계산기
          </Button>
          <Button variant="ghost" onClick={() => scrollToSection("characters")}>
            캐릭터 정보
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin">관리자</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
