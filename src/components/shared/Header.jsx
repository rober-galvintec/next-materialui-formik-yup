// Vendor libs
import React from 'react';

// Material-UI components
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

// Custom libs
import { i18n, withTranslation } from '../../lib/i18n';

// Component definition
const Header = () => {
  return (
    <Container>
      {i18n.languageDetails.map((l) => (
        <Button
          disabled={l.code === i18n.language}
          key={l.code}
          color='secondary'
          key={l.code}
          type='button'
          onClick={(e) => i18n.changeLanguage(l.code)}
        >
          {l.code}
        </Button>
      ))}
    </Container>
  );
};

// Default props
Header.defaultProps = {
  i18nNamespaces: ['common'],
};

// Exportation
export default withTranslation(['common'])(Header);
