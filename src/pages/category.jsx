// Vendor libs
import React, { useState } from 'react';

// Material-UI components
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Custom libs
import { withTranslation } from '../lib/i18n';

// Custom components
import CategoryForm from '../components/category/CategoryForm';

// Data
const category = require('../data/category.json');

// Component definition
const CategoryPage = ({ t }) => {
  // Component state
  const [formResult, setFormResult] = useState({ ok: null, message: '' });

  // Event handlers
  async function formSubmitHandler(values, formActions) {
    formActions.setSubmitting(true);

    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));

      if (values.name === 'xxx') {
        formActions.setFieldError('name', 'Bad name');
        setFormResult({ ok: false, message: 'Bad name' });
      } else {
        formActions.resetForm({ values });
        setFormResult({ ok: true, message: t('successful_request') });
      }
      formActions.setSubmitting(false);
    }, 1500);
  }

  return (
    <Container>
      <Typography variant='h5'>
        {t('common:edit_{entity}', { entity: t('common:category') })}
        <strong>{` "${category.name}"`}</strong>
      </Typography>

      <Box>
        <CategoryForm
          category={category}
          onFormSubmit={formSubmitHandler}
          formResult={formResult}
        />
      </Box>
    </Container>
  );
};

// Default props
CategoryPage.defaultProps = {
  i18nNamespaces: ['common'],
};

// Exportation
export default withTranslation(['common'])(CategoryPage);
