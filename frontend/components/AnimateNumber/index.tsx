'use client';
import gsap from 'gsap';
import { useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

type Props = {
  end: number;
  increment: number;
  start: number;
  asType: string;
};

export default function AnimateNumber({ increment, start, end, asType }: Props) {
  const animateElement = useRef(null);
  const isInView = useInView(animateElement, { once: true });

  useEffect(() => {
    gsap.registerEffect({
      name: 'counter',
      extendTimeline: true,
      defaults: {
        end: 0,
        duration: 1,
        ease: 'power1',
        increment: 1,
      },
      // @ts-expect-error: ignore this
      effect: (targets, config) => {
        const tl = gsap.timeline();
        const num = targets[0].innerText.replace(/\./g, '');
        targets[0].innerText = num;

        tl.to(
          targets,
          {
            duration: config.duration,
            innerText: config.end,
            //snap:{innerText:config.increment},
            modifiers: {
              innerText: function (innerText) {
                return gsap.utils
                  .snap(config.increment, innerText)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              },
            },
            ease: config.ease,
          },
          0
        );

        return tl;
      },
    });

    const tl = gsap.timeline();
    const animatedElementCurrent = animateElement.current;
    if (animatedElementCurrent && isInView) {
      tl.counter(animateElement.current, { end: end, increment: increment, duration: 2 });
    }
  }, [isInView, increment, end]);

  return (
    <div className={asType} ref={animateElement}>
      {start}
    </div>
  );
}
