"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Markdown from "react-markdown";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    title: string;
    dates: string;
    location: string;
    description: string;
    image: string;
    mlh?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


  useEffect(() => {
    addAnimation();
  }, []); // Ensure this runs only once when the component mounts

  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll", // Make sure this is applied
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
          key={`${item.title}-${idx}`}
          className={cn(
            "relative w-[350px] max-w-full shrink-0 rounded-2xl border-2 border-black bg-slate-100 px-8 py-6 md:w-[450px] dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)] transition-all duration-300",
            hoveredIndex !== null && hoveredIndex % items.length !== idx % items.length
              ? "blur-[2px] opacity-80"
              : "blur-none opacity-100"
          )}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <div className="flex items-center gap-4">
                {/* Image */}
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="object-cover rounded-full w-full h-full"
                  />
                </div>
                {/* Title and Date */}
                <div>
                  <span className="relative z-20 text-sm leading-[1.6] font-bold text-neutral-800 dark:text-gray-100">
                    {item.title}
                  </span>
                  <p className="text-xs text-neutral-500 dark:text-gray-400">
                    {item.dates}
                  </p>
                </div>
              </div>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] font-bold text-neutral-600 dark:text-gray-200">
                    {item.location}
                  </span>
                  <span className="text-sm leading-[1.6] font-normal text-neutral-950 dark:text-gray-400">
                    <Markdown className="text-[10px]">{item.description}</Markdown>
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};