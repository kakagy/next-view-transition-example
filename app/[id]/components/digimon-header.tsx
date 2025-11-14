"use client";

import { ViewTransition } from "react";

interface DigimonHeaderProps {
  id: string;
  name: string;
  imageSrc: string;
}

export function DigimonHeader({ id, name, imageSrc }: DigimonHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
      <div className="flex-none">
        <ViewTransition name={`image-${id}`}>
          <img
            src={imageSrc}
            alt={id}
            className="w-full h-auto object-contain max-w-xs mx-auto"
          />
        </ViewTransition>
      </div>
      <div className="flex flex-col flex-auto space-y-4">
        <div className="inline-flex items-baseline flex-wrap p-4 gap-4">
          <ViewTransition name={`name-${id}`}>
            <h1 className="text-5xl font-bold tracking-tight break-all">
              {name}
            </h1>
          </ViewTransition>
        </div>
      </div>
    </div>
  );
}
