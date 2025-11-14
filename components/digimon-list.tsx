"use client";

import { useEffect, useRef } from "react";
import { Digimon } from "@/constants";
import { useDigimonGrid } from "../app/hooks/use-digimon-grid";
import { useGridAnimation } from "../app/hooks/use-grid-animation";
import { DigimonCard } from "./digimon-card";
import { COLUMN_LENGTH } from "../constants";

import gsap from "gsap";

interface DigimonListProps {
  digimons: Digimon[];
}

interface GridBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

let IS_INITIALIZED = false;

export function DigimonList({ digimons }: DigimonListProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { draggableRef, centerGrid, setupDraggable, updateBounds, cleanup } =
    useDigimonGrid();

  const { animateIntro, animateProductVisibility } = useGridAnimation();

  useEffect(() => {
    const dom = containerRef.current;
    const grid = gridRef.current;

    if (!dom || !grid) return;

    const cardElem = Array.from(
      gridRef.current?.querySelectorAll(".digimon-card") || []
    );

    const initializeGrid = () => {
      const draggable = setupDraggable(dom, grid);

      const handleWheel = (e: WheelEvent) => {
        if (!draggableRef.current) return;
        e.preventDefault();

        const deltaX = -e.deltaX * 7;
        const deltaY = -e.deltaY * 7;

        const currentX = gsap.getProperty(grid, "x") as number;
        const currentY = gsap.getProperty(grid, "y") as number;

        const newX = currentX + deltaX;
        const newY = currentY + deltaY;

        const bounds = draggable.vars.bounds as GridBounds;
        if (!bounds) return;

        const clampedX = Math.max(bounds.minX, Math.min(bounds.maxX, newX));
        const clampedY = Math.max(bounds.minY, Math.min(bounds.maxY, newY));

        gsap.to(grid, {
          x: clampedX,
          y: clampedY,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      window.addEventListener("wheel", handleWheel, { passive: false });

      const handleResize = () => updateBounds(grid);
      window.addEventListener("resize", handleResize);

      const productObserver = () => {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              animateProductVisibility(entry.target, entry.isIntersecting);
            });
          },
          {
            root: null,
            threshold: 0.1,
          }
        );

        cardElem.forEach((product) => {
          observerRef.current?.observe(product);
        });
      };

      productObserver();

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("wheel", handleWheel);
      };
    };

    if (IS_INITIALIZED) {
      initializeGrid();
      return () => {
        cleanup();
      };
    }

    IS_INITIALIZED = true;

    animateIntro(dom, cardElem, initializeGrid);
    centerGrid(grid);

    return cleanup;
  }, [centerGrid, setupDraggable, updateBounds, cleanup, animateIntro]);

  const columns = Array.from({
    length: Math.ceil(digimons.length / COLUMN_LENGTH),
  });

  return (
    <div
      ref={containerRef}
      className="custom-container fixed w-screen h-screen top-0 left-0"
    >
      <div
        ref={gridRef}
        className="custom-grid absolute flex gap-[5vw] cursor-grab"
      >
        {columns.map((_, columnIndex) => (
          <div
            key={columnIndex}
            className="custom-column flex flex-col gap-[5vw] even:mt-[10vw]"
          >
            {digimons
              .slice(
                columnIndex * COLUMN_LENGTH,
                columnIndex * COLUMN_LENGTH + COLUMN_LENGTH
              )
              .map((digimon) => (
                <DigimonCard key={digimon.id} digimon={digimon} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
