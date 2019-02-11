import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

import { en } from './_locales';
import { pl } from './_locales';

// the translations
const resources = {
  en: {
    translation: en
  },
  pl: {
    translation: pl
  }
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: '.', // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;