import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import './assets/css/index.css'

//Sistema para traduccion de la web
import {I18nextProvider} from "react-i18next"; //provider para que en cualquier parte de nuestra app tengamos acceso a las traducciones.
import i18next from "i18next";
import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";


i18next.init({
  interpolation: {escapeValue: false},
  lng: "en",
  resources:{
    es:{
      global : global_es,
    },
    en:{
      global : global_en,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
    
  </StrictMode>
);
