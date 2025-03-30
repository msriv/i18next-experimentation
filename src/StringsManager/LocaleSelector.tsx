import { ChangeEvent } from "react";
import { useStringsProvider } from "./StringsProvider"
import { LanguageMap, Languages } from "./types";

const LocaleSelector = () => {
    const { lang, onLangChange, enabledLangs } = useStringsProvider();
    
    const handleLangChange = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const { value } = event.target;
        onLangChange(value as Languages);
    }

    return <select value={lang} onChange={handleLangChange}>
        {enabledLangs.map(lng => <option key={lng} value={lng}>{LanguageMap[lng]}</option>)}
    </select>
}

export default LocaleSelector;