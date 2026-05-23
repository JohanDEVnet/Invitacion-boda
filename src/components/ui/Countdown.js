"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function Countdown() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Wedding Date: Saturday, September 25, 2027 at 9:30 AM (Peru Time, UTC-5)
    const targetDate = new Date("2027-09-25T09:30:00-05:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeItems = [
    { value: timeLeft.days, label: t("countdown.days") },
    { value: timeLeft.hours, label: t("countdown.hours") },
    { value: timeLeft.minutes, label: t("countdown.minutes") },
    { value: timeLeft.seconds, label: t("countdown.seconds") },
  ];

  return (
    <div className="flex gap-2 sm:gap-4 justify-center px-1 w-full max-w-md mx-auto">
      {timeItems.map((item, idx) => (
        <div
          key={idx}
          className="glass-card flex flex-col items-center py-2.5 sm:py-5 border border-[#E8C86B]/20 shadow-lg w-[70px] sm:w-[110px] transition-transform duration-300 hover:scale-105"
        >
          <span className="text-xl sm:text-4xl font-serif text-white font-semibold tracking-tight drop-shadow-[0_0_8px_rgba(232,200,107,0.3)] animate-white-glow">
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="text-[9px] sm:text-xs uppercase tracking-wider text-[#C5A85A] font-semibold mt-1 animate-text-glow">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
