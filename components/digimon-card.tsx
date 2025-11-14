"use client";

import Link from "next/link";
import { useRef, ViewTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Digimon } from "@/constants";
import { cn } from "@/lib/utils";

import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

type DigimonCardProps = {
  digimon: Digimon;
  className?: string;
};

gsap.registerPlugin(ScrambleTextPlugin);

export function DigimonCard({ digimon, className }: DigimonCardProps) {
  const name = useRef(null);

  const scrambleTextName = () => {
    if (!name.current) return;
    gsap.to(name.current, {
      duration: 0.8,
      scrambleText: {
        text: digimon.name,
        chars: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        speed: 0.3,
        delimiter: "",
      },
      ease: "power2.inOut",
    });
  };

  return (
    <Card
      className={cn(
        `digimon-card relative border-none shadow-none group cursor-pointer w-[30vw] md:w-[18.5vw] aspect-square p-0 opacity-0`,
        className
      )}
      onMouseEnter={scrambleTextName}
    >
      <CardContent className="w-full aspect-square p-0">
        <Link
          href={`/${digimon.id}`}
          className="relative flex justify-center items-center"
          shallow
        >
          <ViewTransition name={`name-${digimon.id}`}>
            <h2
              ref={name}
              className={cn(
                "absolute -bottom-4 text-lg md:text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-1000 backdrop-blur-xs"
              )}
            ></h2>
          </ViewTransition>
          <ViewTransition name={`image-${digimon.id}`}>
            <img
              className="w-full h-auto"
              src={digimon.imageSrc}
              alt={digimon.id}
            />
          </ViewTransition>
        </Link>
      </CardContent>
    </Card>
  );
}
