"use client";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const AnimatedTooltip = ({ items }: { items: string[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  const getDeviconUrl = (skill: string) => {
    const clean = skill
      .toLowerCase()
      .replace(/\+/g, "plusplus")
      .replace(/\./g, "dot")
      .replace(/\s/g, "")
      .replace(/-/g, "");

    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${clean}/${clean}-original.svg`;
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 px-4 py-6 mx-auto max-w-screen-xl">
      {items.map((skill, index) => {
        const iconUrl = getDeviconUrl(skill);

        return (
          <div
            key={index}
            className="relative flex justify-center"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Tooltip */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 260, damping: 10 },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  style={{
                    translateX: translateX,
                    rotate: rotate,
                    whiteSpace: "nowrap",
                  }}
                  className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md dark:bg-white bg-black px-4 py-2 text-xs shadow-xl"
                >
                  <div className="relative z-30 text-sm font-semibold dark:text-black text-white">
                    {skill}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Devicon image */}
            <div
              onMouseMove={handleMouseMove}
              className="h-12 w-12 sm:h-16 sm:w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 overflow-hidden rounded-full border-2 border-white bg-white object-cover transition duration-500 hover:scale-110 flex items-center justify-center text-black"
            >
              <img
                src={iconUrl}
                alt={skill}
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-20 lg:h-20"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
