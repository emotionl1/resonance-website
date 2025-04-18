"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronUp, Calendar } from "lucide-react"

// 샘플 패치노트 데이터
const PATCH_NOTES = [
  {
    id: 1,
    version: "v1.4.0",
    date: "2023-12-15",
    title: "겨울 업데이트: 눈의 여왕",
    summary: "새로운 겨울 이벤트와 함께 신규 캐릭터 '프로스트' 추가 및 다양한 밸런스 조정이 이루어졌습니다.",
    category: "major",
    content: `
      ## 신규 콘텐츠
      
      - 겨울 이벤트 '눈의 여왕의 시련' 추가
      - 신규 캐릭터 '프로스트' 추가
      - 겨울 테마 코스튬 10종 추가
      
      ## 밸런스 조정
      
      - 화염 속성 캐릭터들의 기본 공격력 5% 감소
      - 얼음 속성 캐릭터들의 방어력 10% 증가
      - '불꽃의 검' 아이템 효과 재조정
      
      ## 버그 수정
      
      - 특정 상황에서 게임이 멈추는 현상 수정
      - 일부 UI 텍스트 오류 수정
      - 사운드 끊김 현상 개선
    `,
  },
  {
    id: 2,
    version: "v1.3.5",
    date: "2023-11-20",
    title: "밸런스 패치",
    summary: "캐릭터 밸런스 조정 및 버그 수정",
    category: "balance",
    content: `
      ## 밸런스 조정
      
      - '섀도우' 캐릭터의 궁극기 쿨타임 20초에서 25초로 증가
      - '오라' 캐릭터의 방어력 5% 증가
      - '블레이드' 캐릭터의 공격 속도 3% 감소
      
      ## 버그 수정
      
      - 특정 스킬 사용 시 발생하는 그래픽 오류 수정
      - 일부 미션 완료가 되지 않는 문제 해결
    `,
  },
  {
    id: 3,
    version: "v1.3.0",
    date: "2023-10-05",
    title: "할로윈 스페셜 업데이트",
    summary: "할로윈 이벤트와 함께 신규 던전 추가",
    category: "major",
    content: `
      ## 신규 콘텐츠
      
      - 할로윈 이벤트 '유령의 밤' 추가
      - 신규 던전 '공포의 저택' 추가
      - 할로윈 테마 코스튬 8종 추가
      
      ## 시스템 개선
      
      - 인벤토리 UI 개선
      - 친구 시스템 기능 확장
      - 길드 시스템 보상 구조 개선
      
      ## 버그 수정
      
      - 다수의 안정성 개선
      - 성능 최적화
    `,
  },
  {
    id: 4,
    version: "v1.2.5",
    date: "2023-09-15",
    title: "리소스 패치",
    summary: "게임 안정성 개선 및 리소스 최적화",
    category: "resource",
    content: `
      ## 시스템 개선
      
      - 로딩 시간 30% 단축
      - 메모리 사용량 최적화
      - 배터리 소모 개선
      
      ## 버그 수정
      
      - 특정 기기에서 발생하는 충돌 현상 수정
      - 그래픽 렌더링 오류 수정
    `,
  },
  {
    id: 5,
    version: "v1.2.0",
    date: "2023-08-01",
    title: "여름 업데이트: 파도의 축제",
    summary: "여름 테마 이벤트와 신규 캐릭터 '마린' 추가",
    category: "character",
    content: `
      ## 신규 콘텐츠
      
      - 여름 이벤트 '파도의 축제' 추가
      - 신규 캐릭터 '마린' 추가
      - 해변 테마 맵 추가
      
      ## 캐릭터 업데이트
      
      - 기존 캐릭터 5종에 여름 코스튬 추가
      - '아쿠아' 캐릭터 스킬 리워크
      
      ## 시스템 개선
      
      - 매칭 시스템 개선
      - 보상 시스템 재조정
    `,
  },
]

export default function PatchNotes() {
  const [expandedNotes, setExpandedNotes] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState<string>("all")

  const toggleExpand = (id: number) => {
    if (expandedNotes.includes(id)) {
      setExpandedNotes(expandedNotes.filter((noteId) => noteId !== id))
    } else {
      setExpandedNotes([...expandedNotes, id])
    }
  }

  const filteredNotes = activeTab === "all" ? PATCH_NOTES : PATCH_NOTES.filter((note) => note.category === activeTab)

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <p className="text-muted-foreground">최신 업데이트 내용과 변경사항을 빠르게 확인해보세요.</p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full max-w-2xl mx-auto mb-6">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="major">메이저 패치</TabsTrigger>
          <TabsTrigger value="character">캐릭터</TabsTrigger>
          <TabsTrigger value="balance">밸런스</TabsTrigger>
          <TabsTrigger value="resource">리소스</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-4">
            {filteredNotes.map((note) => (
              <Card key={note.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={note.category === "major" ? "default" : "outline"}>{note.version}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {note.date}
                        </div>
                      </div>
                      <CardTitle>{note.title}</CardTitle>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => toggleExpand(note.id)}>
                      {expandedNotes.includes(note.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <CardDescription>{note.summary}</CardDescription>
                </CardHeader>

                {expandedNotes.includes(note.id) && (
                  <CardContent>
                    <div className="prose prose-sm dark:prose-invert">
                      {note.content.split("\n\n").map((paragraph, idx) => {
                        if (paragraph.startsWith("## ")) {
                          return (
                            <h3 key={idx} className="text-lg font-bold mt-4 mb-2">
                              {paragraph.replace("## ", "")}
                            </h3>
                          )
                        } else if (paragraph.startsWith("- ")) {
                          return (
                            <ul key={idx} className="list-disc pl-5 my-2">
                              {paragraph.split("\n").map((item, itemIdx) => (
                                <li key={itemIdx}>{item.replace("- ", "")}</li>
                              ))}
                            </ul>
                          )
                        } else {
                          return <p key={idx}>{paragraph}</p>
                        }
                      })}
                    </div>
                  </CardContent>
                )}

                <CardFooter>
                  <Button variant="ghost" size="sm" onClick={() => toggleExpand(note.id)}>
                    {expandedNotes.includes(note.id) ? "간략히 보기" : "자세히 보기"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
