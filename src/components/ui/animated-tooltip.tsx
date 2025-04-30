"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion"; // Corrected the import to "framer-motion"

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);

  // Rotate and translate tooltip smoothly
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className="flex flex-wrap lg:mx-10 justify-center gap-4 px-4 py-6 w-full">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative flex justify-center"
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Tooltip Animation */}
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 10 } }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{ translateX: translateX, rotate: rotate, whiteSpace: "nowrap" }}
                className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md dark:bg-white bg-black px-4 py-2 text-xs shadow-xl"
              >
                <div className="relative z-30 text-sm font-semibold dark:text-black text-white">
                  {item.name}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Profile Image with Responsive Scaling */}
          <Image
            onMouseMove={handleMouseMove}
            height={60}
            width={60}
            src={item.image}
            alt={item.name}
            className="h-12 w-12 sm:h-16 sm:w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 rounded-full border-2 border-white bg-white object-cover transition duration-500 hover:scale-110"
          />
        </div>
      ))}
    </div>
  );
}



