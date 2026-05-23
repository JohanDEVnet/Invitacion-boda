"use client";
import React, { createContext, useState, useContext } from "react";
import es from "../locales/es.json";
import en from "../locales/en.json";

const LanguageContext = createContext();

const translations = { es, en };

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState("es");

  const t = (path) => {
    const keys = path.split(".");
    let value = translations[locale];
    for (const key of keys) {
      if (value && value[key] !== undefined) {
        value = value[key];
      } else {
        return path; // Fallback to path if translation is missing
      }
    }
    return value;
  };

  const toggleLanguage = () => {
    setLocale((prev) => (prev === "es" ? "en" : "es"));
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
