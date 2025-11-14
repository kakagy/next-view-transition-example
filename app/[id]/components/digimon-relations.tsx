"use client";

import { Digimon } from "@/constants";
import { DigimonCard } from "../../../components/digimon-card";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";

interface DigimonRelationsProps {
  relations: (string | Digimon)[];
}

export function DigimonRelations({ relations }: DigimonRelationsProps) {
  return (
    <Item className="items-start">
      <ItemContent>
        <ItemTitle>{"関連デジモン"}</ItemTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 md:gap-4 md:p-4">
          {relations.map((digimon: Digimon | string) =>
            typeof digimon === "string" ? (
              <p className="">{digimon}</p>
            ) : (
              <DigimonCard
                key={digimon.id}
                digimon={digimon}
                className="opacity-100 w-full md:w-full"
              />
            )
          )}
        </div>
      </ItemContent>
    </Item>
  );
}
