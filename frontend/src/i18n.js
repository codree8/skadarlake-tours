import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import srTranslation from "./locales/sr.json";


const resources = {
    en: {
        translation: enTranslation,
    },
    sr: {
        translation: srTranslation,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;