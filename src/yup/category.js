// Vendor libs
import * as yup from 'yup';

import { enums } from '../lib/enums';

// Vendor libs
const setLocale = require('../lib/set-yup-locale');
// import { regex } from '../lib/regex';

// eslint-disable-next-line import/prefer-default-export
export const categoryUpdateSchema = lang => {
  // Set yup locales
  setLocale(lang);

  return yup.object().shape({
    name: yup.string().required().min(3).max(255),
    position: yup.number().required().min(1).max(10000),
    locales: yup.array().of(
      yup.object().shape({
        lang: yup.mixed().required().oneOf(enums.LANGUAGES).required(),
        name: yup.string().required().min(3),
        slug: yup.string()
      })
    )
  });
};
