import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';
import kn from './locales/kn.json';
import ml from './locales/ml.json';
import ta from './locales/ta.json';
import te from './locales/te.json';
import as from './locales/as.json';
import bn from './locales/bn.json';
import gu from './locales/gu.json';
import mr from './locales/mr.json';
import or from './locales/or.json';
import pa from './locales/pa.json';
import mni from './locales/mni.json';
import lus from './locales/lus.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  kn: { translation: kn },
  ml: { translation: ml },
  ta: { translation: ta },
  te: { translation: te },
  as: { translation: as },
  bn: { translation: bn },
  gu: { translation: gu },
  mr: { translation: mr },
  or: { translation: or },
  pa: { translation: pa },
  mni: { translation: mni },
  lus: { translation: lus },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n; 