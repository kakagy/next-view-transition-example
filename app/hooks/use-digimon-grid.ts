"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

interface GridBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export function useDigimonGrid() {
  const draggableRef = useRef<Draggable | null>(null);

  const centerGrid = (grid: HTMLElement) => {
    const gridWidth = grid.offsetWidth;
    const gridHeight = grid.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const centerX = (windowWidth - gridWidth) / 2;
    const centerY = (windowHeight - gridHeight) / 2;

    gsap.set(grid, {
      x: centerX,
      y: centerY,
    });
  };

  const calculateBounds = (grid: HTMLElement): GridBounds => ({
    minX: -(grid.offsetWidth - window.innerWidth) - 200,
    maxX: 200,
    minY: -(grid.offsetHeight - window.innerHeight) - 100,
    maxY: 100,
  });

  const setupDraggable = (dom: HTMLElement, grid: HTMLElement): Draggable => {
    dom.classList.add("--is-loaded");

    const draggable = Draggable.create(grid, {
      type: "x,y",
      bounds: calculateBounds(grid),
      inertia: true,
      allowEventDefault: true,
      edgeResistance: 0.9,
    })[0];

    draggableRef.current = draggable;
    return draggable;
  };

  const updateBounds = (grid: HTMLElement) => {
    if (draggableRef.current) {
      draggableRef.current.vars.bounds = {
        minX: -(grid.offsetWidth - window.innerWidth) - 50,
        maxX: 50,
        minY: -(grid.offsetHeight - window.innerHeight) - 50,
        maxY: 50,
      };
    }
  };

  const cleanup = () => {
    if (draggableRef.current) {
      draggableRef.current.kill();
      draggableRef.current = null;
    }
  };

  return {
    draggableRef,
    centerGrid,
    setupDraggable,
    updateBounds,
    cleanup,
  };
}
