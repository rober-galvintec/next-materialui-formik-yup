// Vendor libs
import React, { useContext } from 'react';
import { Formik, FieldArray, Form, Field } from 'formik';
import { I18nContext } from 'next-i18next';

// Formik-Material-UI
import { TextField } from 'formik-material-ui';

// Material-UI icons
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';

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

// Component definition
const CategoryForm = ({ t, category, onCategoryFormSubmit }) => {
  // Get current language
  const {
    i18n: { language },
  } = useContext(I18nContext);

  return (
    <Container>
      <Formik
        initialValues={{
          name: category?.name || '',
          position: category?.position || 0,
        }}
        validationSchema={categoryUpdateSchema(language)}
        onSubmit={(values, { setSubmitting }) => {
          onCategoryFormSubmit(values);
          setTimeout(() => {
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting, isValid, dirty }) => (
          <Form>
            <Box mt={2}>
              <Field
                required
                component={TextField}
                variant='outlined'
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
              <br />
              <Field
                component={TextField}
                type='text'
                label={t('position')}
                name='position'
              />
            </Box>

            <Box mt={3}>{isSubmitting && <LinearProgress />}</Box>

            <Box>
              <span>Dirty: {dirty}</span>
            </Box>

            <Box mt={3}>
              <Button
                variant='contained'
                color='primary'
                disabled={!isValid || !dirty || isSubmitting}
                onClick={submitForm}
                mt={2}
              >
                Submit
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
