"use client";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TypeShuffle } from "../../utils/js/typeShuffle";
import { useEffect } from "react";

interface DigimonInfoProps {
  level: string;
  type: string;
  attribute: string;
  skill: string;
}

export function DigimonInfo({
  level,
  type,
  attribute,
  skill,
}: DigimonInfoProps) {
  useEffect(() => {
    const textElements = document.querySelectorAll(
      '[data-slot="item-content"]'
    );

    if (textElements.length > 0) {
      textElements.forEach((el) => {
        const ts = new TypeShuffle(el);
        ts.trigger("fx6");
      });
    }
  }, [level]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 w-full">
      <Item className="items-start">
        <ItemContent>
          <ItemTitle>{"レベル"}</ItemTitle>
          <ItemDescription>{level}</ItemDescription>
        </ItemContent>
      </Item>

      <Item className="items-start">
        <ItemContent>
          <ItemTitle>{"タイプ"}</ItemTitle>
          <ItemDescription>{type}</ItemDescription>
        </ItemContent>
      </Item>

      <Item className="items-start">
        <ItemContent>
          <ItemTitle>{"属性"}</ItemTitle>
          <ItemDescription>{attribute}</ItemDescription>
        </ItemContent>
      </Item>

      <Item className="items-start">
        <ItemContent>
          <ItemTitle>{"必殺技"}</ItemTitle>
          <div className="flex flex-wrap gap-2">
            <ScrollArea className="h-12 w-full">
              {skill.split("\n").map((skillText, index) => (
                <p key={index}>{skillText}</p>
              ))}
            </ScrollArea>
          </div>
        </ItemContent>
      </Item>
    </div>
  );
}
