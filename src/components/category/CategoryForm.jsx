// Vendor libs
import React, { useState, useContext } from 'react';
import { Formik, FieldArray, Form, Field } from 'formik';
import slugify from 'slugify';
import { I18nContext } from 'next-i18next';

// Material-UI components
import Alert from '@material-ui/lab/Alert';

// Formik-Material-UI
import { TextField } from 'formik-material-ui';

// Material-UI icons
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/SettingsBackupRestore';

// Material-UI components
import { Button, LinearProgress, Container, Box } from '@material-ui/core';

// Custom libs
import { withTranslation } from '../../lib/i18n';

// Yup schema
import { categoryUpdateSchema } from '../../yup/category';

// Custom components
import LangSelector from '../shared/LangSelector';

// Component definition
const CategoryForm = ({ t, category, onFormSubmit }) => {
  // Get current language
  const {
    i18n: { language, languageDetails },
  } = useContext(I18nContext);
  // Component state
  const [localeLang, setLocaleLang] = useState(category.locales[0].lang);
  return (
    <Formik
      initialValues={{
        name: category?.name || '',
        position: category?.position || 0,
        locales:
          category?.locales ||
          languageDetails.map((l) => ({
            code: l.code,
            name: '',
            slug: '',
          })),
      }}
      validationSchema={categoryUpdateSchema(language)}
      onSubmit={(values, actions) => {
        onFormSubmit(values, actions);
      }}
    >
      {({
        values,
        status,
        submitForm,
        isSubmitting,
        isValid,
        dirty,
        resetForm,
        setFieldValue,
      }) => (
        <Form>
          <Box>
            {/* Name */}
            <Box mt={2}>
              <Field
                required
                fullWidth
                component={TextField}
                variant='standard'
                name='name'
                type='text'
                label={t('name')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Position */}
            <Box mt={2}>
              <Field
                component={TextField}
                fullWidth
                type='text'
                label={t('position')}
                name='position'
              />
            </Box>

            {/* Language selector */}
            <Box mt={3}>
              <LangSelector
                localeLangs={category.locales.map((bl) => bl.lang)}
                onLocaleLangChanged={(l) => setLocaleLang(l)}
              />
            </Box>

            {/* Locales */}
            <FieldArray
              name='locales'
              render={() => (
                <Box>
                  {values.locales.map((locale, index) => {
                    if (locale.lang === localeLang) {
                      return (
                        <Box key={index}>
                          <Box mt={2} mb={1}>
                            <Field
                              required
                              mt={3}
                              component={TextField}
                              variant='outlined'
                              fullWidth
                              type='text'
                              label={t('name')}
                              name={`locales.${index}.name`}
                              onChange={(e) => {
                                // Set name
                                setFieldValue(
                                  `locales.${index}.name`,
                                  e.target.value
                                );

                                // Fill slug
                                setFieldValue(
                                  `locales.${index}.slug`,
                                  slugify(e.target.value, { lower: true })
                                );
                              }}
                            />
                          </Box>
                          <Box mt={3} mb={1}>
                            <Field
                              component={TextField}
                              variant='outlined'
                              fullWidth
                              type='text'
                              label={t('slug')}
                              name={`locales.${index}.slug`}
                            />
                          </Box>
                        </Box>
                      );
                    }
                  })}
                </Box>
              )}
            />
          </Box>

          <Box mt={3}>{isSubmitting && <LinearProgress />}</Box>

          <Box mt={3}>
            {!isSubmitting && !dirty && status?.message && (
              <Alert severity={status?.ok === true ? 'success' : 'error'}>
                {status.message}
              </Alert>
            )}
          </Box>

          <Box
            mt={3}
            display='flex'
            flexDirection='row'
            justifyContent='flex-end'
          >
            <Box mr={1}>
              <Button
                color='default'
                disabled={!isValid || !dirty || isSubmitting}
                onClick={resetForm}
              >
                <CancelIcon /> &nbsp; {t('cancel')}
              </Button>
            </Box>
            <Box mr={1}>
              <Button
                variant='contained'
                color='primary'
                disabled={!isValid || !dirty || isSubmitting}
                onClick={submitForm}
              >
                <CheckIcon /> &nbsp;{t('accept')}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

// Default props
CategoryForm.defaultProps = {
  i18nNamespaces: ['common'],
};

// Exportation
export default withTranslation(['common'])(CategoryForm);
