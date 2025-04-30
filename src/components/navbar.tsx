"use client";

import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Hamburger + Close icon

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed flex justify-between top-0 inset-x-0 z-50 backdrop-blur-md bg-white/70 dark:bg-black/30 border-b border-zinc-200 dark:border-white/10 px-6 py-3 shadow-md">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <Image
          src="/buildspace.jpg"
          alt="logo"
          height={40}
          width={40}
          className="rounded-full"
        />
        <span className="text-xl font-bold text-primary">Nayan</span>
      </div>

      {/* Hamburger Button (Mobile only) */}
      <button
        className="md:hidden text-muted-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Center: Nav Links */}
      <nav className="hidden md:flex space-x-4">
        {DATA.navbar.map((item) => (
          <Tooltip key={item.href}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-sm text-muted-foreground hover:text-primary transition"
                )}
              >
                {item.label}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>

      {/* Right: Social + Theme Toggle (Desktop) */}
      <div className="hidden md:flex items-center space-x-3">
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social]) => (
            <Tooltip key={name}>
              <TooltipTrigger asChild>
                <Link
                  href={social.url}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-8"
                  )}
                >
                  <social.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          ))}

        <ModeToggle />
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-black px-6 py-4 flex flex-col gap-3 md:hidden shadow-lg border-t border-gray-200 dark:border-white/10 z-40">
          <div className="flex flex-col space-y-2">
            {DATA.navbar.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm text-muted-foreground hover:text-primary transition"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-3 pt-4 border-t border-gray-200 dark:border-white/10">
            {Object.entries(DATA.contact.social)
              .filter(([_, social]) => social.navbar)
              .map(([name, social]) => (
                <Link
                  key={name}
                  href={social.url}
                  className="text-muted-foreground hover:text-primary"
                >
                  <social.icon className="size-5" />
                </Link>
              ))}
            <ModeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
