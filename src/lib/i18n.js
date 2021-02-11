// Vendor libs
const NextI18Next = require('next-i18next').default;
const path = require('path');

// Custom libs
const {
  defaultLanguage,
  localeSubpaths,
} = require('next/config').default().publicRuntimeConfig;

// --------------------------------------------------
// SET ACTIVE LANGUAGES HERE
// --------------------------------------------------
const languages = Object.keys(localeSubpaths);

// --------------------------------------------------
// !IMPORTANT !!! - DO NOT MODIFY allLanguageDetails
// --------------------------------------------------
const allLanguageDetails = [
  {
    position: 1,
    code: 'es',
    name: 'Castellano',
  },
  {
    position: 2,
    code: 'en',
    name: 'English',
  },
  {
    position: 3,
    code: 'fr',
    name: 'Français',
  },
  {
    position: 4,
    code: 'de',
    name: 'Deuch',
  },
  {
    position: 5,
    code: 'pt',
    name: 'Português',
  },
  {
    position: 6,
    code: 'it',
    name: 'Italiano',
  },
  {
    position: 7,
    code: 'gl',
    name: 'Galego',
  },
  {
    position: 8,
    code: 'ca',
    name: 'Catalá',
  },
  {
    position: 9,
    code: 'eu',
    name: 'Euskera',
  },
];

// **************************************************

// Map languageDetails from languages and allLanguageDetails
const languageDetails = allLanguageDetails.filter(
  (l) => languages.indexOf(l.code) > -1
);

// Map otherLanguages from languages and defaultLanguage
const otherLanguages = languages.filter((l) => l !== defaultLanguage);

const NextI18NextInstance = new NextI18Next({
  localeSubpaths,
  defaultLanguage,
  otherLanguages,
  interpolation: {
    escapeValue: false,
  },
  localePath: path.resolve('./public/static/locales'),
});

// Trick for avoid console log "react-i18next:: i18n.languages were undefined or empty undefined"
NextI18NextInstance.i18n.languages = languages;
NextI18NextInstance.i18n.languageDetails = languageDetails;
NextI18NextInstance.i18n.otherLanguages = otherLanguages;

module.exports = NextI18NextInstance;
