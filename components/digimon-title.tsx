"use client";

import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrambleTextPlugin);

let IS_INITIALIZED = false;
const DigimonTitle = () => {
  const title = useRef(null);

  useEffect(() => {
    if (IS_INITIALIZED) return;
    const timeline = gsap.timeline();

    timeline.to(title.current, {
      duration: 2,
      scrambleText: {
        text: "DIGIMON LIBRARY",
        chars: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        speed: 0.3,
        delimiter: "",
      },
      ease: "power2.inOut",
    });

    timeline.to(title.current, {
      duration: 0.8,
      opacity: 0,
      ease: "power2.inOut",
    });

    if (!IS_INITIALIZED) {
      IS_INITIALIZED = true;
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full transition-opacity flex justify-center items-center">
      <h1 ref={title} className="text-5xl"></h1>
    </div>
  );
};

export default DigimonTitle;
