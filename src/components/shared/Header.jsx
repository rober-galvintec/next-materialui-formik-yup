// Vendor libs
import React from 'react';

// Material-UI components
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

// Custom libs
import { i18n, withTranslation } from '../../lib/i18n';

// Component definition
const Header = () => {
  return (
    <Container>
      {i18n.languageDetails.map(l => (
        <Button
          disabled={l.code === i18n.language}
          key={l.code}
          color='secondary'
          type='button'
          onClick={() => i18n.changeLanguage(l.code)}
        >
          {l.code}
        </Button>
      ))}
    </Container>
  );
};

// Default props
Header.defaultProps = {
  i18nNamespaces: ['common']
};

// Exportation
export default withTranslation(['common'])(Header);
