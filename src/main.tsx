import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import resources from "./strings.json";
import AppConfig from "./config.ts";
import { StringsProvider } from './StringsManager';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StringsProvider
        defaultLang={AppConfig.stringsConfig.defaultLang} 
        enabledLangs={AppConfig.stringsConfig.enabledLangs} 
        resources={resources}
      >
      <App />
    </StringsProvider>
  </StrictMode>,
)
