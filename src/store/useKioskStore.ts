
import { create } from 'zustand';
import { type Language, translations } from '../i18n/translations';

interface KioskState {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: keyof typeof translations['en']) => string;
}

export const useKioskStore = create<KioskState>((set, get) => ({
    language: 'en',
    setLanguage: (lang) => set({ language: lang }),
    t: (key) => {
        const lang = get().language;
        return translations[lang][key] || key;
    },
}));
