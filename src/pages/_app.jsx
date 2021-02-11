// Vendor libs
import React, { useState, useEffect } from 'react';
import App from 'next/app';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Custom libs
import theme from '../themes/light';
import { appWithTranslation, lang } from '../lib/i18n';

// Components
import Header from '../components/shared/Header';

const BaseApp = ({ Component, pageProps }) => {
  // Component state
  const [ssrDone, setSSRDone] = useState(false);

  useEffect(() => {
    setSSRDone(true);

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  if (!ssrDone) {
    return <div>loading...</div>;
  }

  return (
    <React.Fragment>
      <Head>
        <title>Next.js + Material-UI + Formik + Yup</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
};

// InitialProps
BaseApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);
  const { defaultProps } = appContext.Component;
  return {
    ...appProps,
    pageProps: {
      namespacesRequired: [
        ...(appProps.pageProps.namespacesRequired || []),
        ...(defaultProps?.i18nNamespaces || [])
      ]
    }
  };
};

// PropTypes
BaseApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
};

// Exportation
export default appWithTranslation(BaseApp);
