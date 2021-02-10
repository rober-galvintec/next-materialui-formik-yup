// Vendor libs
import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Custom libs
import theme from '../themes/light';
import { appWithTranslation, lang } from '../lib/i18n';

const BaseApp = (props) => {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

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
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
};

// InitialProps
BaseApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { defaultProps } = appContext.Component;
  return {
    ...appProps,
    pageProps: {
      namespacesRequired: [
        ...(appProps.pageProps.namespacesRequired || []),
        ...(defaultProps?.i18nNamespaces || []),
      ],
    },
  };
};

// PropTypes
BaseApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

// Exportation
export default appWithTranslation(BaseApp);
