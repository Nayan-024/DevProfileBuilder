import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {MagicCard} from "./magic-card"; // Adjust this path as needed

interface Certification {
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
}

interface CertificateCardProps {
  certifications: ReadonlyArray<Certification>;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certifications }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 400; // Adjust as needed
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full px-4">
      {/* Arrow Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 scroll-smooth scrollbar-hide py-6 px-8"
      >
        {certifications.map((card, idx) => (
          <MagicCard
            key={`${card.title}-${idx}`}
            className="flex-shrink-0 w-full max-w-[400px] rounded-2xl border-2 border-black bg-slate-100 p-6 dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)]"
            gradientSize={180}
            gradientColor="#262626"
            gradientOpacity={0.7}
            gradientFrom="#9E7AFF"
            gradientTo="#FE8BBB"
          >
            <div className="relative w-full h-[250px] sm:h-[280px] md:h-[300px] overflow-hidden rounded-2xl group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:brightness-100"
                style={{ backgroundImage: `url(${card.imageUrl})` }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 opacity-100 group-hover:opacity-100">
                <h3 className="text-white text-lg sm:text-xl font-extrabold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {card.title}
                </h3>
                <p className="text-white text-xs sm:text-sm mt-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  issued by {card.issuer}
                </p>
                <p className="text-white text-xs sm:text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {card.date}
                </p>
              </div>
            </div>
          </MagicCard>
        ))}
      </div>
    </div>
  );
};

export default CertificateCard;
