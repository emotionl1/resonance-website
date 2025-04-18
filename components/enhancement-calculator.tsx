"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { HelpCircle, Calculator } from "lucide-react"

// 레벨별 필요 경험치 데이터
const EXP_DATA = {
  UR: {
    "무기/방어구": [
      100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000,
      3400, 3800, 4200, 4600, 5000, 5400, 5800, 6200, 6600, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000,
      16000, 17000, 19000, 21000, 23000, 25000, 27000, 29000, 31000, 33000, 35000, 37000, 41000, 45000, 49000, 53000,
      57000, 61000, 65000, 69000, 73000, 77000, 81000, 85000, 89000, 93000, 97000, 101000, 105000, 109000, 113000,
    ],
    악세서리: [
      150, 300, 450, 600, 750, 900, 1050, 1200, 1350, 1500, 1800, 2100, 2400, 2700, 3000, 3300, 3600, 3900, 4200, 4500,
      5100, 5700, 6300, 6900, 7500, 8100, 8700, 9300, 9900, 10500, 12000, 13500, 15000, 16500, 18000, 19500, 21000,
      22500, 24000, 25500, 28500, 31500, 34500, 37500, 40500, 43500, 46500, 49500, 52500, 55500, 61500, 67500, 73500,
      79500, 85500, 91500, 97500, 103500, 109500, 115500, 121500, 127500, 133500, 139500, 145500, 151500, 157500,
      163500, 169500,
    ],
  },
  SSR: {
    "무기/방어구": [
      65, 110, 165, 220, 275, 330, 385, 440, 495, 550, 660, 770, 880, 990, 1100, 1210, 1320, 1430, 1540, 1650, 1870,
      2090, 2310, 2530, 2750, 2970, 3190, 3410, 3630, 3850, 4400, 4950, 5500, 6050, 6600, 7150, 7700, 8250, 8800, 9350,
      10450, 11550, 12650, 13750, 14850, 15950, 17050, 18150, 19250, 20350, 22550, 24750, 26950, 29150, 31350, 33550,
      35750, 37950, 40150, 42350, 44550, 46750, 48950, 51150, 53350, 55550, 57750, 59950, 62150,
    ],
    악세서리: [
      97, 165, 247, 330, 412, 495, 577, 660, 742, 825, 990, 1155, 1320, 1485, 1650, 1815, 1980, 2145, 2310, 2475, 2805,
      3135, 3465, 3795, 4125, 4455, 4785, 5115, 5445, 5775, 6600, 7425, 8250, 9075, 9900, 10725, 11550, 12375, 13200,
      14025, 15675, 17325, 18975, 20625, 22275, 23925, 25575, 27225, 28875, 30525, 33825, 37125, 40425, 43725, 47025,
      50325, 53625, 56925, 60225, 63525, 66825, 70125, 73425, 76725, 80025, 83325, 86625, 89925, 93225,
    ],
  },
  SR: {
    "무기/방어구": [
      40, 70, 105, 140, 175, 210, 245, 280, 315, 350, 420, 490, 560, 630, 700, 770, 840, 910, 980, 1050, 1190, 1330,
      1470, 1610, 1750, 1890, 2030, 2170, 2310, 2450, 2800, 3150, 3500, 3850, 4200, 4550, 4900, 5250, 5600, 5950, 6650,
      7350, 8050, 8750, 9450, 10150, 10850, 11550, 12250, 12950, 14350, 15750, 17150, 18550, 19950, 21350, 22750, 24150,
      25550, 26950, 28350, 29750, 31150, 32550, 33950, 35350, 36750, 38150, 39550,
    ],
    악세서리: [
      60, 105, 157, 210, 262, 315, 367, 420, 472, 525, 630, 735, 840, 945, 1050, 1155, 1260, 1365, 1470, 1575, 1785,
      1995, 2205, 2415, 2625, 2835, 3045, 3255, 3465, 3675, 4200, 4725, 5250, 5775, 6300, 6825, 7350, 7875, 8400, 8925,
      9975, 11025, 12075, 13125, 14175, 15225, 16275, 17325, 18375, 19425, 21525, 23625, 25725, 27825, 29925, 32025,
      34125, 36225, 38325, 40425, 42525, 44625, 46725, 48825, 50925, 53025, 55125, 57225, 59325,
    ],
  },
  R: {
    "무기/방어구": [
      25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 850, 950, 1050,
      1150, 1250, 1350, 1450, 1550, 1650, 1750, 2000, 2250, 2500, 2750, 3000, 3250, 3500, 3750, 4000, 4250, 4750, 5250,
      5750, 6250, 6750, 7250, 7750, 8250, 8750, 9250, 10250, 11250, 12250, 13250, 14250, 15250, 16250, 17250, 18250,
      19250, 20250, 21250, 22250, 23250, 24250, 25250, 26250, 27250, 28250,
    ],
    악세서리: [
      37, 75, 112, 150, 187, 225, 262, 300, 337, 375, 450, 525, 600, 675, 750, 825, 900, 975, 1050, 1125, 1275, 1425,
      1575, 1725, 1875, 2025, 2175, 2325, 2475, 2625, 3000, 3375, 3750, 4125, 4500, 4875, 5250, 5625, 6000, 6375, 7125,
      7875, 8625, 9375, 10125, 10875, 11625, 12375, 13125, 13875, 15375, 16875, 18375, 19875, 21375, 22875, 24375,
      25875, 27375, 28875, 30375, 31875, 33375, 34875, 36375, 37875, 39375, 40875, 42375,
    ],
  },
}

// 레벨별 필요 골드 데이터
const GOLD_DATA = {
  UR: {
    "무기/방어구": [
      1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 14000, 16000, 18000, 20000, 22000, 24000,
      26000, 28000, 30000, 34000, 38000, 42000, 46000, 50000, 54000, 58000, 62000, 66000, 70000, 80000, 90000, 100000,
      110000, 120000, 130000, 140000, 150000, 160000, 170000, 190000, 210000, 230000, 250000, 270000, 290000, 310000,
      330000, 350000, 370000, 410000, 450000, 490000, 530000, 570000, 610000, 650000, 690000, 730000, 770000, 810000,
      850000, 890000, 930000, 970000, 1010000, 1050000, 1090000, 1130000,
    ],
    악세서리: [
      1500, 3000, 4500, 6000, 7500, 9000, 10500, 12000, 13500, 15000, 18000, 21000, 24000, 27000, 30000, 33000, 36000,
      39000, 42000, 45000, 51000, 57000, 63000, 69000, 75000, 81000, 87000, 93000, 99000, 105000, 120000, 135000,
      150000, 165000, 180000, 195000, 210000, 225000, 240000, 255000, 285000, 315000, 345000, 375000, 405000, 435000,
      465000, 495000, 525000, 555000, 615000, 675000, 735000, 795000, 855000, 915000, 975000, 1035000, 1095000, 1155000,
      1215000, 1275000, 1335000, 1395000, 1455000, 1515000, 1575000, 1635000, 1695000,
    ],
  },
  SSR: {
    "무기/방어구": [
      650, 1100, 1650, 2200, 2750, 3300, 3850, 4400, 4950, 5500, 6600, 7700, 8800, 9900, 11000, 12100, 13200, 14300,
      15400, 16500, 18700, 20900, 23100, 25300, 27500, 29700, 31900, 34100, 36300, 38500, 44000, 49500, 55000, 60500,
      66000, 71500, 77000, 82500, 88000, 93500, 104500, 115500, 126500, 137500, 148500, 159500, 170500, 181500, 192500,
      203500, 225500, 247500, 269500, 291500, 313500, 335500, 357500, 379500, 401500, 423500, 445500, 467500, 489500,
      511500, 533500, 555500, 577500, 599500, 621500,
    ],
    악세서리: [
      975, 1650, 2475, 3300, 4125, 4950, 5775, 6600, 7425, 8250, 9900, 11550, 13200, 14850, 16500, 18150, 19800, 21450,
      23100, 24750, 28050, 31350, 34650, 37950, 41250, 44550, 47850, 51150, 54450, 57750, 66000, 74250, 82500, 90750,
      99000, 107250, 115500, 123750, 132000, 140250, 156750, 173250, 189750, 206250, 222750, 239250, 255750, 272250,
      288750, 305250, 338250, 371250, 404250, 437250, 470250, 503250, 536250, 569250, 602250, 635250, 668250, 701250,
      734250, 767250, 800250, 833250, 866250, 899250, 932250,
    ],
  },
  SR: {
    "무기/방어구": [
      400, 700, 1050, 1400, 1750, 2100, 2450, 2800, 3150, 3500, 4200, 4900, 5600, 6300, 7000, 7700, 8400, 9100, 9800,
      10500, 11900, 13300, 14700, 16100, 17500, 18900, 20300, 21700, 23100, 24500, 28000, 31500, 35000, 38500, 42000,
      45500, 49000, 52500, 56000, 59500, 66500, 73500, 80500, 87500, 94500, 101500, 108500, 115500, 122500, 129500,
      143500, 157500, 171500, 185500, 199500, 213500, 227500, 241500, 255500, 269500, 283500, 297500, 311500, 325500,
      339500, 353500, 367500, 381500, 395500,
    ],
    악세서리: [
      600, 1050, 1575, 2100, 2625, 3150, 3675, 4200, 4725, 5250, 6300, 7350, 8400, 9450, 10500, 11550, 12600, 13650,
      14700, 15750, 17850, 19950, 22050, 24150, 26250, 28350, 30450, 32550, 34650, 36750, 42000, 47250, 52500, 57750,
      63000, 68250, 73500, 78750, 84000, 89250, 99750, 110250, 120750, 131250, 141750, 152250, 162750, 173250, 183750,
      194250, 215250, 236250, 257250, 278250, 299250, 320250, 341250, 362250, 383250, 404250, 425250, 446250, 467250,
      488250, 509250, 530250, 551250, 572250, 593250,
    ],
  },
  R: {
    "무기/방어구": [
      250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000,
      7500, 8500, 9500, 10500, 11500, 12500, 13500, 14500, 15500, 16500, 17500, 20000, 22500, 25000, 27500, 30000,
      32500, 35000, 37500, 40000, 42500, 47500, 52500, 57500, 62500, 67500, 72500, 77500, 82500, 87500, 92500, 102500,
      112500, 122500, 132500, 142500, 152500, 162500, 172500, 182500, 192500, 202500, 212500, 222500, 232500, 242500,
      252500, 262500, 272500, 282500,
    ],
    악세서리: [
      375, 750, 1125, 1500, 1875, 2250, 2625, 3000, 3375, 3750, 4500, 5250, 6000, 6750, 7500, 8250, 9000, 9750, 10500,
      11250, 12750, 14250, 15750, 17250, 18750, 20250, 21750, 23250, 24750, 26250, 30000, 33750, 37500, 41250, 45000,
      48750, 52500, 56250, 60000, 63750, 71250, 78750, 86250, 93750, 101250, 108750, 116250, 123750, 131250, 138750,
      153750, 168750, 183750, 198750, 213750, 228750, 243750, 258750, 273750, 288750, 303750, 318750, 333750, 348750,
      363750, 378750, 393750, 408750, 423750,
    ],
  },
}

// 성운상 물질 경험치 값
const MATERIAL_EXP = {
  t8: 4000, // 성운상 물질(8Ti)
  t4: 2000, // 성운상 물질(4Ti)
  t2: 1000, // 성운상 물질(2Ti)
  t1: 500, // 성운상 물질(1Ti)
}

export default function EnhancementCalculator() {
  const [grade, setGrade] = useState<string>("SSR")
  const [type, setType] = useState<string>("무기/방어구")
  const [currentLevel, setCurrentLevel] = useState<number>(0)
  const [targetLevel, setTargetLevel] = useState<number>(10)
  const [showTable, setShowTable] = useState<boolean>(false)

  // 계산 결과
  const calculateResults = () => {
    if (currentLevel >= targetLevel) return { exp: 0, gold: 0, materials: { t8: 0, t4: 0, t2: 0, t1: 0 } }

    let totalExp = 0
    let totalGold = 0

    // 현재 레벨부터 목표 레벨까지의 필요 경험치와 골드를 합산
    for (let level = currentLevel; level < targetLevel; level++) {
      if (level < 70) {
        // 레벨은 0부터 69까지 (1~70)
        totalExp += EXP_DATA[grade][type][level]
        totalGold += GOLD_DATA[grade][type][level]
      }
    }

    // 재료 계산 (최적화된 방식으로 계산)
    let remainingExp = totalExp
    const t8Count = Math.floor(remainingExp / MATERIAL_EXP.t8)
    remainingExp -= t8Count * MATERIAL_EXP.t8

    const t4Count = Math.floor(remainingExp / MATERIAL_EXP.t4)
    remainingExp -= t4Count * MATERIAL_EXP.t4

    const t2Count = Math.floor(remainingExp / MATERIAL_EXP.t2)
    remainingExp -= t2Count * MATERIAL_EXP.t2

    const t1Count = Math.ceil(remainingExp / MATERIAL_EXP.t1)

    return {
      exp: totalExp,
      gold: totalGold,
      materials: {
        t8: t8Count,
        t4: t4Count,
        t2: t2Count,
        t1: t1Count,
      },
    }
  }

  const results = calculateResults()

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>강화 계산기</CardTitle>
        <CardDescription>장비를 원하는 단계까지 강화할 때 필요한 경험치 및 재료 소비량을 계산해보세요!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="grade">장비 등급</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                        <HelpCircle className="h-4 w-4" />
                        <span className="sr-only">등급 설명</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>장비 등급에 따라 필요한 경험치가 달라집니다.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger id="grade">
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

            <div className="space-y-2">
              <Label htmlFor="type">장비 유형</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="무기/방어구">무기/방어구</SelectItem>
                  <SelectItem value="악세서리">악세서리</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="current-level">현재 강화 레벨</Label>
              <Input
                id="current-level"
                type="number"
                min={0}
                max={99}
                value={currentLevel}
                onChange={(e) => setCurrentLevel(Number.parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-level">목표 강화 레벨</Label>
              <Input
                id="target-level"
                type="number"
                min={1}
                max={70}
                value={targetLevel}
                onChange={(e) => setTargetLevel(Number.parseInt(e.target.value) || 1)}
              />
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">총 필요 경험치</p>
                <p className="text-2xl font-bold">{results.exp.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">소모 골드</p>
                <p className="text-2xl font-bold">{results.gold.toLocaleString()}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">필요한 재료 수량</p>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-background p-2 rounded">
                  <p className="text-xs">8Ti</p>
                  <p className="font-bold">{results.materials.t8}</p>
                </div>
                <div className="bg-background p-2 rounded">
                  <p className="text-xs">4Ti</p>
                  <p className="font-bold">{results.materials.t4}</p>
                </div>
                <div className="bg-background p-2 rounded">
                  <p className="text-xs">2Ti</p>
                  <p className="font-bold">{results.materials.t2}</p>
                </div>
                <div className="bg-background p-2 rounded">
                  <p className="text-xs">1Ti</p>
                  <p className="font-bold">{results.materials.t1}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setShowTable(!showTable)}>
              {showTable ? "등급별 경험치 표 숨기기" : "등급별 경험치 표 보기"}
            </Button>
            <Button>
              <Calculator className="mr-2 h-4 w-4" />
              계산하기
            </Button>
          </div>

          {showTable && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>등급</TableHead>
                  <TableHead>무기/방어구 (레벨 1)</TableHead>
                  <TableHead>악세서리 (레벨 1)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>UR</TableCell>
                  <TableCell>{EXP_DATA.UR["무기/방어구"][0]}</TableCell>
                  <TableCell>{EXP_DATA.UR["악세서리"][0]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SSR</TableCell>
                  <TableCell>{EXP_DATA.SSR["무기/방어구"][0]}</TableCell>
                  <TableCell>{EXP_DATA.SSR["악세서리"][0]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SR</TableCell>
                  <TableCell>{EXP_DATA.SR["무기/방어구"][0]}</TableCell>
                  <TableCell>{EXP_DATA.SR["악세서리"][0]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>R</TableCell>
                  <TableCell>{EXP_DATA.R["무기/방어구"][0]}</TableCell>
                  <TableCell>{EXP_DATA.R["악세서리"][0]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
