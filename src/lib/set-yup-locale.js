// Vendor libs
const { setLocale } = require('yup');

// Members
const validationES = require('../../public/static/locales/es/yup.json');
const validationEN = require('../../public/static/locales/en/yup.json');
// const validationDE = require('../../locales/de/yup.json');
// const validationFR = require('../../locales/fr/yup.json');
// const validationIT = require('../../locales/it/yup.json');
// const validationPT = require('../../locales/pt/yup.json');
// const validationGL = require('../../locales/gl/yup.json');
// const validationCA = require('../../locales/ca/yup.json');
// const validationEU = require('../../locales/eu/yup.json');

module.exports = lng => {
  switch (lng) {
    case 'es':
      setLocale(validationES);
      break;
    case 'en':
      setLocale(validationEN);
      break;
    // case 'de':
    //   setLocale(validationDE);
    //   break;
    // case 'fr':
    //   setLocale(validationFR);
    //   break;
    // case 'it':
    //   setLocale(validationIT);
    //   break;
    // case 'pt':
    //   setLocale(validationPT);
    //   break;
    // case 'gl':
    //   setLocale(validationGL);
    //   break;
    // case 'eu':
    //   setLocale(validationEU);
    //   break;
    // case 'ca':
    //   setLocale(validationCA);
    //   break;
    default:
      setLocale(validationEN);
      break;
  }
};
