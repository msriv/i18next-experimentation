import { createContext, ReactNode, useContext, useState } from "react";
import i18n, { InitOptions, Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import { Languages } from "./types";

interface StringsContextProps {
    lang: Languages,
    resources: Resource,
    onLangChange: (lang: Languages) => void,
    enabledLangs: Languages[],
    i18nInstance: typeof i18n
}

const StringsContext = createContext<StringsContextProps>({
    lang: Languages.ENGLISH,
    resources: {},
    onLangChange: () => {},
    enabledLangs: [Languages.ENGLISH],
    i18nInstance: i18n
})

export const useStringsProvider = () => {
    const context = useContext(StringsContext);
    if (!context) {
        throw new Error("Use useStringsProvider hook within the StringsProvider.")
    }
    return context;
}

interface StringsProviderProps extends StringsContextProps {
    resources: Resource,
    defaultLang: Languages,
    children?: ReactNode
}



function StringsProvider({ defaultLang, enabledLangs, resources, children }: Omit<StringsProviderProps, "onLangChange" | "lang" | "i18nInstance">) {
    const [lang, setLang] = useState<Languages>(defaultLang);

    const onLangChange = (changedLang: Languages) => {
        setLang(changedLang);
        i18n.changeLanguage(changedLang)
    }

    const config: InitOptions = {
        resources,
        lng: lang,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    } 
    
    i18n.use(initReactI18next).init(config);

    return <StringsContext.Provider value={{ 
        lang, 
        onLangChange, 
        enabledLangs, 
        resources, 
        i18nInstance: i18n 
    }}>
        {children}
    </StringsContext.Provider>
}

export default StringsProvider;