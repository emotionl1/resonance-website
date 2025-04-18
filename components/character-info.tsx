"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sword, Shield, Heart, Zap, Flame, Droplet, Wind, Mountain, X } from "lucide-react"

// 샘플 캐릭터 데이터
const CHARACTERS = [
  {
    id: 1,
    name: "블레이드",
    thumbnail: "/placeholder.svg?height=200&width=200",
    grade: "SSR",
    element: "fire",
    position: "dealer",
    story:
      "한때 왕국의 최고 검사였으나, 왕국이 몰락한 후 방랑자가 되었다. 그의 검에는 불의 정령이 깃들어 있으며, 전투 중에는 불꽃으로 적을 태워버린다.",
    combatStyle:
      "근접 공격 특화형 딜러로, 빠른 공격 속도와 화염 속성 추가 데미지가 특징입니다. 콤보 시스템을 활용한 연속 공격으로 단일 대상에게 강력한 피해를 입힐 수 있습니다.",
    recommendedEquipment: ["무기: 불꽃의 검 (UR)", "방어구: 불사조의 갑옷 (SSR)", "악세서리: 화염의 반지 (SSR)"],
    skills: [
      {
        name: "불꽃 베기",
        description: "전방의 적을 베어 물리 데미지를 입히고, 3초간 화상 상태로 만듭니다.",
      },
      {
        name: "폭발 찌르기",
        description: "단일 대상에게 강력한 찌르기 공격을 가하고, 주변 적들에게 폭발 데미지를 입힙니다.",
      },
      {
        name: "불의 춤",
        description: "10초간 공격 속도가 30% 증가하고, 모든 공격에 화염 속성 데미지가 추가됩니다.",
      },
      {
        name: "불꽃의 분노",
        description: "궁극기: 주변 모든 적에게 강력한 화염 폭발을 일으켜 대량의 데미지를 입히고, 5초간 기절시킵니다.",
      },
    ],
  },
  {
    id: 2,
    name: "프로스트",
    thumbnail: "/placeholder.svg?height=200&width=200",
    grade: "SSR",
    element: "water",
    position: "support",
    story:
      "북쪽 얼음 산맥에서 태어난 얼음의 마법사. 어린 시절 마을이 눈사태로 파괴된 후, 얼음의 힘을 통제하는 법을 배우기 위해 오랜 수련을 거쳤다.",
    combatStyle:
      "원거리 지원형 캐릭터로, 적의 이동 속도를 감소시키고 아군에게 보호막을 제공합니다. 광역 제어기와 회복 능력을 갖추고 있어 팀 생존력을 크게 향상시킵니다.",
    recommendedEquipment: [
      "무기: 서리의 지팡이 (SSR)",
      "방어구: 얼음 결정 로브 (SSR)",
      "악세서리: 차가운 심장의 목걸이 (UR)",
    ],
    skills: [
      {
        name: "얼음 화살",
        description: "단일 대상에게 얼음 화살을 발사하여 데미지를 입히고, 2초간 이동 속도를 40% 감소시킵니다.",
      },
      {
        name: "서리 폭풍",
        description: "주변 적들에게 얼음 데미지를 입히고, 3초간 공격 속도를 20% 감소시킵니다.",
      },
      {
        name: "얼음 보호막",
        description:
          "아군 하나에게 최대 체력의 15%에 해당하는 보호막을 생성합니다. 보호막이 지속되는 동안 대상은 빙결 상태 면역을 얻습니다.",
      },
      {
        name: "절대 영도",
        description: "궁극기: 넓은 범위 내의 모든 적을 4초간 빙결시키고, 아군 전체의 체력을 20% 회복시킵니다.",
      },
    ],
  },
  {
    id: 3,
    name: "섀도우",
    thumbnail: "/placeholder.svg?height=200&width=200",
    grade: "SR",
    element: "dark",
    position: "assassin",
    story:
      "정체불명의 암살자. 과거에 대해 아는 사람은 없으며, 그림자 속에서 나타나 임무를 완수한 후 다시 어둠 속으로 사라진다.",
    combatStyle:
      "은신과 순간 폭발력이 특징인 암살자형 캐릭터입니다. 적의 후방에 빠르게 접근하여 치명타 데미지를 입히고, 다시 그림자 속으로 숨을 수 있습니다.",
    recommendedEquipment: ["무기: 그림자 단검 (SR)", "방어구: 어둠의 망토 (SR)", "악세서리: 암살자의 인장 (SSR)"],
    skills: [
      {
        name: "그림자 칼날",
        description: "전방의 적에게 빠른 속도로 칼날을 휘둘러 물리 데미지를 입히고, 3초간 출혈 상태로 만듭니다.",
      },
      {
        name: "그림자 도약",
        description: "지정한 위치로 순간 이동하여, 주변 적들에게 데미지를 입힙니다. 이동 후 2초간 은신 상태가 됩니다.",
      },
      {
        name: "죽음의 표식",
        description: "대상에게 표식을 부여합니다. 표식이 있는 대상에 대한 공격은 20% 증가한 치명타 데미지를 입힙니다.",
      },
      {
        name: "천 개의 그림자",
        description: "궁극기: 5초간 분신을 생성하여 주변의 모든 적을 공격합니다. 이 동안 받는 데미지가 50% 감소합니다.",
      },
    ],
  },
  {
    id: 4,
    name: "오라",
    thumbnail: "/placeholder.svg?height=200&width=200",
    grade: "UR",
    element: "light",
    position: "healer",
    story:
      "고대 빛의 신전에서 태어난 치유사. 어릴 때부터 특별한 빛의 힘을 보여 신관들에게 발탁되어 신성한 치유 기술을 배웠다.",
    combatStyle:
      "팀의 생존력을 책임지는 핵심 힐러입니다. 지속적인 회복 효과와 디버프 해제 능력을 갖추고 있으며, 위기 상황에서 팀 전체에 강력한 버프를 제공할 수 있습니다.",
    recommendedEquipment: ["무기: 신성한 지팡이 (UR)", "방어구: 천상의 로브 (UR)", "악세서리: 생명의 꽃 (SSR)"],
    skills: [
      {
        name: "치유의 빛",
        description: "단일 아군의 체력을 최대 체력의 25% 회복시키고, 3초간 받는 데미지를 10% 감소시킵니다.",
      },
      {
        name: "정화",
        description: "대상의 모든 디버프를 제거하고, 5초간 디버프 면역 상태를 부여합니다.",
      },
      {
        name: "축복",
        description:
          "아군 전체에게 10초간 지속되는 체력 회복 효과를 부여합니다. 매 초마다 최대 체력의 3%를 회복합니다.",
      },
      {
        name: "신성한 수호",
        description: "궁극기: 아군 전체의 체력을 40% 회복시키고, 8초간 받는 데미지를 30% 감소시킵니다.",
      },
    ],
  },
  {
    id: 5,
    name: "마린",
    thumbnail: "/placeholder.svg?height=200&width=200",
    grade: "SSR",
    element: "water",
    position: "dealer",
    story:
      "깊은 바다의 왕국에서 온 전사. 바다의 힘을 다루는 능력을 타고났으며, 육지의 세계를 탐험하기 위해 왕국을 떠났다.",
    combatStyle:
      "물의 힘을 활용한 원거리 공격형 딜러입니다. 광역 공격과 제어 효과를 겸비하고 있어 다수의 적을 상대하는 데 효과적입니다.",
    recommendedEquipment: ["무기: 파도의 삼지창 (SSR)", "방어구: 심해의 갑옷 (SSR)", "악세서리: 조류의 반지 (SR)"],
    skills: [
      {
        name: "파도 베기",
        description: "전방의 적들에게 물 속성 데미지를 입히고, 2초간 이동 속도를 30% 감소시킵니다.",
      },
      {
        name: "물의 감옥",
        description: "대상 지역에 물의 감옥을 생성하여 3초간 적들을 가두고 지속적인 데미지를 입힙니다.",
      },
      {
        name: "해일",
        description: "전방으로 거대한 해일을 발사하여 경로상의 모든 적에게 강력한 물 속성 데미지를 입힙니다.",
      },
      {
        name: "포세이돈의 분노",
        description:
          "궁극기: 넓은 범위에 폭풍우를 일으켜 8초간 지속적인 데미지를 입히고, 적들의 공격 속도와 이동 속도를 20% 감소시킵니다.",
      },
    ],
  },
]

export default function CharacterInfo() {
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null)

  const getElementIcon = (element: string) => {
    switch (element) {
      case "fire":
        return <Flame className="h-4 w-4 text-red-500" />
      case "water":
        return <Droplet className="h-4 w-4 text-blue-500" />
      case "earth":
        return <Mountain className="h-4 w-4 text-green-500" />
      case "wind":
        return <Wind className="h-4 w-4 text-teal-500" />
      case "light":
        return <Zap className="h-4 w-4 text-yellow-500" />
      case "dark":
        return <Shield className="h-4 w-4 text-purple-500" />
      default:
        return null
    }
  }

  const getPositionIcon = (position: string) => {
    switch (position) {
      case "dealer":
        return <Sword className="h-4 w-4" />
      case "tank":
        return <Shield className="h-4 w-4" />
      case "healer":
        return <Heart className="h-4 w-4" />
      case "support":
        return <Zap className="h-4 w-4" />
      case "assassin":
        return <Sword className="h-4 w-4" />
      default:
        return null
    }
  }

  const getPositionName = (position: string) => {
    switch (position) {
      case "dealer":
        return "딜러"
      case "tank":
        return "탱커"
      case "healer":
        return "힐러"
      case "support":
        return "서포터"
      case "assassin":
        return "암살자"
      default:
        return position
    }
  }

  const getElementName = (element: string) => {
    switch (element) {
      case "fire":
        return "화염"
      case "water":
        return "물"
      case "earth":
        return "대지"
      case "wind":
        return "바람"
      case "light":
        return "빛"
      case "dark":
        return "어둠"
      default:
        return element
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <p className="text-muted-foreground">레조넌스의 다양한 캐릭터를 만나보세요.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {CHARACTERS.map((character) => (
          <Card key={character.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={character.thumbnail || "/placeholder.svg"}
                  alt={character.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-1">
                  <Badge variant="secondary" className="bg-black/60 text-white border-none">
                    {character.grade}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl mb-2">{character.name}</CardTitle>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {getElementIcon(character.element)}
                  <span className="text-sm">{getElementName(character.element)}</span>
                </div>
                <div className="flex items-center gap-1">
                  {getPositionIcon(character.position)}
                  <span className="text-sm">{getPositionName(character.position)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4 pt-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => setSelectedCharacter(character.id)}>
                    스토리 보기
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{character.name}의 스토리</DialogTitle>
                  </DialogHeader>
                  <p className="py-4">{character.story}</p>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm" onClick={() => setSelectedCharacter(character.id)}>
                    상세 정보
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
                  <DialogHeader>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-bold">
                        {character.grade}
                      </Badge>
                      <DialogTitle>{character.name}</DialogTitle>
                    </div>
                    <DialogDescription className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        {getElementIcon(character.element)}
                        <span>{getElementName(character.element)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getPositionIcon(character.position)}
                        <span>{getPositionName(character.position)}</span>
                      </div>
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid md:grid-cols-[200px_1fr] gap-4 mt-4">
                    <div className="relative aspect-square">
                      <Image
                        src={character.thumbnail || "/placeholder.svg"}
                        alt={character.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>

                    <Tabs defaultValue="combat">
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="combat">전투 스타일</TabsTrigger>
                        <TabsTrigger value="equipment">추천 장비</TabsTrigger>
                        <TabsTrigger value="skills">스킬 정보</TabsTrigger>
                      </TabsList>

                      <ScrollArea className="h-[300px] rounded-md border p-4">
                        <TabsContent value="combat" className="mt-0">
                          <p>{character.combatStyle}</p>
                        </TabsContent>

                        <TabsContent value="equipment" className="mt-0">
                          <ul className="space-y-2">
                            {character.recommendedEquipment.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </TabsContent>

                        <TabsContent value="skills" className="mt-0">
                          <div className="space-y-4">
                            {character.skills.map((skill, idx) => (
                              <div key={idx} className="border-b pb-3 last:border-0">
                                <h4 className="font-bold mb-1">{skill.name}</h4>
                                <p className="text-sm text-muted-foreground">{skill.description}</p>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </ScrollArea>
                    </Tabs>
                  </div>

                  <div className="flex justify-end mt-4">
                    <DialogClose asChild>
                      <Button variant="outline">
                        <X className="h-4 w-4 mr-2" />
                        닫기
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
