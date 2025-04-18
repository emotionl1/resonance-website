import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "관리자 - 레조넌스 정보 사이트",
  description: "레조넌스 게임 정보 사이트 관리자 페이지",
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="min-h-screen bg-muted/40">{children}</div>
}
