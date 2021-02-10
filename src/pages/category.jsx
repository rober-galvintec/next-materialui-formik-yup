// Vendor libs
import React from 'react';

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
  // Event handlers
  function categoryFormSubmitHandler(values) {
    console.log(JSON.stringify(values, null, 2));
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
          onCategoryFormSubmit={categoryFormSubmitHandler}
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
