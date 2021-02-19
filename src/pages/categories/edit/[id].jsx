// Vendor libs
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { I18nContext } from 'next-i18next';

// Material-UI components
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Custom libs
import { withTranslation } from '../../../lib/i18n';

// Custom components
import CategoryForm from '../../../components/category/CategoryForm';

// Yup schema
import { categoryUpdateSchema } from '../../../yup/category';

// Data
const category = require('../../../data/category.json');

// Component definition
const CategoryPage = ({ t }) => {
  // Get current language
  const {
    i18n: { language }
  } = useContext(I18nContext);

  // Event handlers
  async function formSubmitHandler(values, formActions) {
    formActions.setSubmitting(true);

    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));

      if (values.name === 'xxx') {
        formActions.setFieldError('name', 'Bad name');
        formActions.setStatus({
          ok: false,
          message: 'Error en datos enviados'
        });
      } else {
        formActions.resetForm({ values });
        formActions.setStatus({ ok: true, message: t('successful_request') });
      }
      formActions.setSubmitting(false);
    }, 500);
  }

  return (
    <Container>
      <Typography variant='h5'>
        {t('common:edit_{entity}', { entity: t('common:category') })}
        <strong>{` "${category.name}"`}</strong>
      </Typography>

      <Box display='flex' justifyContent='flex-start'>
        <CategoryForm
          validationSchema={categoryUpdateSchema(language)}
          category={category}
          onFormSubmit={formSubmitHandler}
        />
      </Box>
    </Container>
  );
};

// Default props
CategoryPage.defaultProps = {
  i18nNamespaces: ['common']
};

// PropTypes
CategoryPage.propTypes = {
  t: PropTypes.func
};

// Exportation
export default withTranslation(['common'])(CategoryPage);
