// Vendor libs
import React, { useState, useContext } from 'react';
import { Formik, FieldArray, Form, Field } from 'formik';
import { I18nContext } from 'next-i18next';

// Formik-Material-UI
import { TextField } from 'formik-material-ui';

// Material-UI icons
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CheckIcon from '@material-ui/icons/Check';

// Material-UI components
import {
  Button,
  LinearProgress,
  Typography,
  Container,
  Box,
} from '@material-ui/core';

// Custom libs
import { withTranslation } from '../../lib/i18n';

// Yup schema
import { categoryUpdateSchema } from '../../yup/category';

// Custom components
import LangSelector from '../shared/LangSelector';

// Component definition
const CategoryForm = ({ t, category, onCategoryFormSubmit }) => {
  // Get current language
  const {
    i18n: { language, languageDetails },
  } = useContext(I18nContext);

  // Component state
  const [localeLang, setLocaleLang] = useState(category.locales[0].lang);

  return (
    <Container>
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
        onSubmit={(values, { setSubmitting }) => {
          onCategoryFormSubmit(values);
          setTimeout(() => {
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ values, submitForm, isSubmitting, isValid, dirty }) => (
          <Form>
            <Box mt={2} style={{ width: 500 }}>
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
                  localeLang={localeLang}
                  availableLangs={languageDetails}
                  onLocaleLangChanged={(l) => setLocaleLang(l)}
                />
              </Box>

              {/* Locales */}
              <FieldArray
                name='locales'
                render={() => (
                  <Box>
                    {values.locales.map((locale, index) => {
                      if (values.locales[index].lang === localeLang) {
                        return (
                          <Box key={index}>
                            <Box mt={2} mb={1}>
                              <Field
                                required
                                mt={3}
                                component={TextField}
                                fullWidth
                                type='text'
                                label={t('name')}
                                name={`locales.${index}.name`}
                              />
                            </Box>
                            <Box mt={1} mb={1}>
                              <Field
                                component={TextField}
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
              <Button
                variant='contained'
                color='primary'
                disabled={!isValid || !dirty || isSubmitting}
                onClick={submitForm}
                mt={2}
              >
                <CheckIcon /> {t('accept')}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

// Default props
CategoryForm.defaultProps = {
  i18nNamespaces: ['common'],
};

// Exportation
export default withTranslation(['common'])(CategoryForm);
