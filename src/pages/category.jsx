// Vendor libs
import React from 'react';

// Material-UI components
import Container from '@material-ui/core/Container';

// Custom libs
import { withTranslation } from '../lib/i18n';
import { Typography } from '@material-ui/core';

// Data
const category = require('../data/category.json');

// Component definition
const CategoryPage = ({ t }) => {
  return (
    <Container>
      <Typography variant='h5'>
        {t('common:edit_{entity}', { entity: t('common:category') })}
      </Typography>
    </Container>
  );
};

// Default props
CategoryPage.defaultProps = {
  i18nNamespaces: ['common'],
};

// Exportation
export default withTranslation(['common'])(CategoryPage);
