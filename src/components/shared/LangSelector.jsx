// Vendor libs
import React, { useState, useContext } from 'react';
import { I18nContext } from 'next-i18next';

// Material-UI components
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// Custom libs
import { withTranslation } from '../../lib/i18n';

// Component definition
const LangSelector = ({ localeLang, onLocaleLangChanged }) => {
  // Component state
  const [currentTab, setCurrentTab] = useState(0);

  const {
    i18n: { languageDetails },
  } = useContext(I18nContext);

  // Event handlers
  function handleCurrentTabChanged(c) {
    setCurrentTab(c);
    onLocaleLangChanged(languageDetails[c].code);
  }

  function a11yProps(index) {
    return {
      id: `lang-tab-${index}`,
      'aria-controls': `lang-tabpanel-${index}`,
    };
  }

  return (
    <Box display='flex' flexDirection='row' alignItems='center'>
      <Tabs
        ml={5}
        value={currentTab}
        onChange={(e, c) => handleCurrentTabChanged(c)}
        aria-label='Language selector'
      >
        {languageDetails &&
          languageDetails.length > 0 &&
          languageDetails.map((al, index) => (
            <Tab
              key={al.code}
              label={al.name}
              id={a11yProps(index)}
              index={al.position}
            />
          ))}

        {/* <Tab key={'es'} label='Castellano' {...a11yProps('es')} index={0} />
        <Tab key={'en'} label='English' {...a11yProps('en')} index={1} /> */}

        {/* <Tab key={'es'} label='Castellano' {...a11yProps('es')} index={0} />
        <Tab key={'en'} label='English' {...a11yProps('en')} index={1} /> */}
      </Tabs>
    </Box>
  );
};

// Page defaultProps (include translations namespaces via "i18nNamespaces")
LangSelector.defaultProps = {
  i18nNamespaces: ['common'],
};

// Exportation
export default withTranslation(['common'])(LangSelector);