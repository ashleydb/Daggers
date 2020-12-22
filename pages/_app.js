import React from 'react';
import { wrapper } from '../store/store';

// ---CSS---
import '../styles/app.scss';

// ---Redux---
const WrappedApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(WrappedApp)