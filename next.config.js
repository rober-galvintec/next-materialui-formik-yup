const { nextI18NextRewrites } = require('next-i18next/rewrites');

// ---------------------------------------------------
// VALID LANGUAGES: es, en, fr, pt, it, de, gl, ca, eu
// ---------------------------------------------------

// Set language settings here
const defaultLanguage = 'es';
const localeSubpaths = {
  es: 'es',
  en: 'en'
};

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    defaultLanguage,
    localeSubpaths
  },
  env: {
    DEFAULT_THEME: process.env.DEFAULT_THEME
  }
};
