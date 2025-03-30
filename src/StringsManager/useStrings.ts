import { useMemo } from "react";
import { useStringsProvider } from "./StringsProvider"

interface UseStringsOptions {
    namespaces: string[]
}

export default function ({ namespaces = [""] }: UseStringsOptions = { namespaces: [""] }): Record<"currentLanguage" | string, string> {
    const { lang, i18nInstance } = useStringsProvider();
    const currentLanguage = i18nInstance.language;

    const strings = useMemo(() => {
        let combinedStrings = {} as Record<string, string>;
        namespaces.forEach(ns => {
            const nsStrings = i18nInstance.getResourceBundle(currentLanguage, ns);
            console.log(nsStrings)
            if (nsStrings) combinedStrings = { ...combinedStrings, ...nsStrings }
        })
        return combinedStrings;
    }, [currentLanguage, namespaces.join(",")])

    return { lang, ...strings };
}