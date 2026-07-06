import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import hi from "./hi.json";

import { getLanguage } from "../storage";

export const initI18n = async () => {
  const savedLang = await getLanguage();

  await i18n.use(initReactI18next).init({
    lng: savedLang || "en",
    fallbackLng: "en",

    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },

    interpolation: {
      escapeValue: false,
    },
  });
};

export default i18n;