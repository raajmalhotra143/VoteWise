import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "timeline": "Timeline",
        "quiz": "Quiz",
        "myths": "Myths",
        "chat": "Chat AI",
        "evm": "Mock EVM",
        "form6": "Form 6 Guide",
        "constituency": "Insights"
      },
      "hero": {
        "headline": "Understand Your Vote. Shape India's Future.",
        "subheadline": "VoteWise makes the Indian election process simple, interactive, and easy to understand for every citizen.",
        "cta_learn": "Start Learning",
        "cta_chat": "Ask AI Assistant"
      }
    }
  },
  hi: {
    translation: {
      "nav": {
        "home": "होम",
        "timeline": "समयरेखा",
        "quiz": "क्विज़",
        "myths": "भ्रांतियां",
        "chat": "चैट एआई",
        "evm": "मॉक ईवीएम",
        "form6": "फॉर्म 6 गाइड",
        "constituency": "अंतर्दृष्टि"
      },
      "hero": {
        "headline": "अपने वोट को समझें। भारत के भविष्य को आकार दें।",
        "subheadline": "वोटवाइज भारतीय चुनाव प्रक्रिया को हर नागरिक के लिए सरल, संवादात्मक और समझने में आसान बनाता है।",
        "cta_learn": "सीखना शुरू करें",
        "cta_chat": "एआई सहायक से पूछें"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
