"use client";
import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function LanguageToggle() {
  const { locale, toggleLanguage } = useLanguage();

  return (
    <button
      id="language-toggle"
      onClick={toggleLanguage}
      className="fixed top-5 right-5 z-50 flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-[#E8C86B]/35 shadow-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#E8C86B]/15 hover:scale-105 cursor-pointer"
      aria-label="Toggle language"
    >
      <span className={locale === "es" ? "text-[#E8C86B]" : "text-white/40"}>
        ES
      </span>
      <span className="text-[#E8C86B]/50">·</span>
      <span className={locale === "en" ? "text-[#E8C86B]" : "text-white/40"}>
        EN
      </span>
    </button>
  );
}
