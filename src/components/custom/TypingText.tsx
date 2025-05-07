"use client";

import React, { useEffect, useState } from "react";

interface TypingTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

const TypingText: React.FC<TypingTextProps> = ({
  texts,
  typingSpeed = 10,
  deletingSpeed = 50,
  pauseTime = 20,
  className = "",
}) => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout: NodeJS.Timeout;
  
    if (!isDeleting && displayedText === currentText) {
      // Pause before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && displayedText === "") {
      // Move to next text after deleting
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    } else {
      // Typing or Deleting characters
      timeout = setTimeout(() => {
        if (isDeleting) {
          setDisplayedText((prev) => prev.slice(0, -1));
        } else {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }
      }, isDeleting ? deletingSpeed : typingSpeed);
    }
  
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, texts, textIndex, typingSpeed, deletingSpeed, pauseTime]);
  
  return (
    <span className={`whitespace-nowrap ${className}`}>
      {displayedText}
      <span className="blinking-cursor">|</span>
    </span>
  );
};

export default TypingText;