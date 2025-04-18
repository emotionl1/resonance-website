"use client"

import { CardFooter } from "@/components/ui/card"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { FileText, Users, Calculator, Plus, LogOut, Move, Trash2, Edit, BookOpen } from "lucide-react"

// 샘플 섹션 데이터
const INITIAL_SECTIONS = [
  { id: "calculator", name: "강화 계산기", icon: <Calculator className="h-4 w-4" /> },
  { id: "patch-notes", name: "패치노트", icon: <FileText className="h-4 w-4" /> },
  { id: "characters", name: "캐릭터 정보", icon: <Users className="h-4 w-4" /> },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [sections, setSections] = useState(INITIAL_SECTIONS)
  const [showNewSectionDialog, setShowNewSectionDialog] = useState(false)
  const [newSectionName, setNewSectionName] = useState("")
  const [newSectionId, setNewSectionId] = useState("")

  const handleLogout = () => {
    router.push("/")
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(sections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setSections(items)
  }

  const handleAddNewSection = () => {
    if (!newSectionName || !newSectionId) return

    setSections([
      ...sections,
      {
        id: newSectionId,
        name: newSectionName,
        icon: <BookOpen className="h-4 w-4" />,
      },
    ])

    setShowNewSectionDialog(false)
    setNewSectionName("")
    setNewSectionId("")
  }

  const handleDeleteSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id))
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">관리자 대시보드</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          로그아웃
        </Button>
      </div>

      <Tabs defaultValue="sections">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="sections">섹션 관리</TabsTrigger>
          <TabsTrigger value="patch-notes">패치노트 관리</TabsTrigger>
          <TabsTrigger value="characters">캐릭터 관리</TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">섹션 순서 및 관리</h2>
            <Dialog open={showNewSectionDialog} onOpenChange={setShowNewSectionDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />새 섹션 추가
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>새 섹션 추가</DialogTitle>
                  <DialogDescription>새로운 섹션의 이름과 ID를 입력하세요.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">섹션 이름</Label>
                    <Input
                      id="name"
                      value={newSectionName}
                      onChange={(e) => setNewSectionName(e.target.value)}
                      placeholder="예: 장비 도감"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="id">섹션 ID</Label>
                    <Input
                      id="id"
                      value={newSectionId}
                      onChange={(e) => setNewSectionId(e.target.value)}
                      placeholder="예: equipment"
                    />
                    <p className="text-sm text-muted-foreground">영문 소문자와 하이픈(-)만 사용하세요.</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNewSectionDialog(false)}>
                    취소
                  </Button>
                  <Button onClick={handleAddNewSection}>추가</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>섹션 순서 변경</CardTitle>
              <CardDescription>드래그 앤 드롭으로 섹션 순서를 변경하거나 섹션을 삭제할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="sections">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {sections.map((section, index) => (
                        <Draggable key={section.id} draggableId={section.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-center justify-between p-4 border rounded-md bg-card"
                            >
                              <div className="flex items-center gap-3">
                                <div {...provided.dragHandleProps} className="cursor-move">
                                  <Move className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div className="flex items-center gap-2">
                                  {section.icon}
                                  <span className="font-medium">{section.name}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteSection(section.id)}
                                  disabled={index < 3} // 기본 섹션은 삭제 불가
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patch-notes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">패치노트 관리</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />새 패치노트 추가
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>패치노트 목록</CardTitle>
              <CardDescription>패치노트를 관리하고 새로운 패치노트를 추가할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 패치노트 목록 */}
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">v1.4.0</Badge>
                      <h3 className="font-medium">겨울 업데이트: 눈의 여왕</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">2023-12-15</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">v1.3.5</Badge>
                      <h3 className="font-medium">밸런스 패치</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">2023-11-20</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">v1.3.0</Badge>
                      <h3 className="font-medium">할로윈 스페셜 업데이트</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">2023-10-05</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>패치노트 편집</CardTitle>
              <CardDescription>패치노트 내용을 편집하거나 새로운 패치노트를 작성합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="version">버전</Label>
                    <Input id="version" placeholder="예: v1.5.0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">날짜</Label>
                    <Input id="date" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">제목</Label>
                  <Input id="title" placeholder="패치노트 제목" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">요약</Label>
                  <Input id="summary" placeholder="패치노트 간략 요약" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">카테고리</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="major">메이저 패치</SelectItem>
                      <SelectItem value="character">캐릭터</SelectItem>
                      <SelectItem value="balance">밸런스</SelectItem>
                      <SelectItem value="resource">리소스</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">내용</Label>
                  <Textarea id="content" placeholder="패치노트 상세 내용" rows={10} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">취소</Button>
              <Button>저장</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="characters" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">캐릭터 관리</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />새 캐릭터 추가
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>캐릭터 목록</CardTitle>
              <CardDescription>캐릭터 정보를 관리하고 새로운 캐릭터를 추가할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 캐릭터 목록 */}
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt="블레이드"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">블레이드</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          SSR
                        </Badge>
                        <span>화염</span>
                        <span>딜러</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt="프로스트"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">프로스트</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          SSR
                        </Badge>
                        <span>물</span>
                        <span>서포터</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>캐릭터 편집</CardTitle>
              <CardDescription>캐릭터 정보를 편집하거나 새로운 캐릭터를 추가합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input id="name" placeholder="캐릭터 이름" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">등급</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="등급 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UR">UR</SelectItem>
                        <SelectItem value="SSR">SSR</SelectItem>
                        <SelectItem value="SR">SR</SelectItem>
                        <SelectItem value="R">R</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="element">속성</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="속성 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fire">화염</SelectItem>
                        <SelectItem value="water">물</SelectItem>
                        <SelectItem value="earth">대지</SelectItem>
                        <SelectItem value="wind">바람</SelectItem>
                        <SelectItem value="light">빛</SelectItem>
                        <SelectItem value="dark">어둠</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">포지션</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="포지션 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dealer">딜러</SelectItem>
                        <SelectItem value="tank">탱커</SelectItem>
                        <SelectItem value="healer">힐러</SelectItem>
                        <SelectItem value="support">서포터</SelectItem>
                        <SelectItem value="assassin">암살자</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail">썸네일 이미지</Label>
                  <Input id="thumbnail" type="file" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="story">스토리</Label>
                  <Textarea id="story" placeholder="캐릭터 스토리" rows={4} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="combat-style">전투 스타일</Label>
                  <Textarea id="combat-style" placeholder="전투 스타일 설명" rows={4} />
                </div>

                <div className="space-y-2">
                  <Label>추천 장비</Label>
                  <div className="space-y-2">
                    <Input placeholder="무기 (예: 불꽃의 검 (UR))" />
                    <Input placeholder="방어구 (예: 불사조의 갑옷 (SSR))" />
                    <Input placeholder="악세서리 (예: 화염의 반지 (SSR))" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>스킬 정보</Label>
                  <div className="border rounded-md p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="스킬 이름" />
                      <Input placeholder="스킬 설명" />
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      스킬 추가
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">취소</Button>
              <Button>저장</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
