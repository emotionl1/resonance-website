import React from 'react';
import EnhancementCalculator from "@/components/enhancement-calculator"
import PatchNotes from "@/components/patch-notes"
import CharacterInfo from "@/components/character-info"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <main className="min-h-screen">
      <section id="calculator" className="py-16 container">
        <h2 className="text-3xl font-bold mb-8 text-center">강화 계산기</h2>
        <EnhancementCalculator />
      </section>

      <Separator className="my-8" />

      <section id="patch-notes" className="py-16 container">
        <h2 className="text-3xl font-bold mb-8 text-center">패치노트</h2>
        <PatchNotes />
      </section>

      <Separator className="my-8" />

      <section id="characters" className="py-16 container">
        <h2 className="text-3xl font-bold mb-8 text-center">캐릭터 정보</h2>
        <CharacterInfo />
      </section>
    </main>
  )
}
