"use client";

import gsap from "gsap";

export function useGridAnimation() {
  const animateIntro = (
    dom: HTMLElement,
    products: Element[],
    onComplete: () => void
  ) => {
    const timeline = gsap.timeline();

    timeline.set(dom, { scale: 0.5 });
    timeline.set(products, {
      scale: 0.5,
      opacity: 0,
    });

    timeline.delay(3);

    timeline.to(products, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: {
        amount: 1.2,
        from: "random",
      },
    });

    timeline.to(dom, {
      scale: 1,
      duration: 1.2,
      ease: "power3.inOut",
      onComplete,
    });
  };

  const animateProductVisibility = (target: Element, isVisible: boolean) => {
    if (isVisible) {
      gsap.to(target, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(target, {
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  };

  return {
    animateIntro,
    animateProductVisibility,
  };
}
