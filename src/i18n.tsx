import i18n from "i18next";
import { initReactI18next } from 'react-i18next';

import translationEn from './locales/en/translation.json';
import translationRu from './locales/ru/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEn,
  },
  ru: {
    translation: translationRu,
  },
};


i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ru",
    fallbackLng: "ru",

    keySeparator: ".", // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;