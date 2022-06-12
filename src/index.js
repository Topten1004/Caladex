import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Web3ReactProvider } from '@web3-react/core';

import reportWebVitals from './utils/reportWebVitals';

import { getLibrary } from './utils/helper' ;

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
     <App />
  </Web3ReactProvider> ,
  document.getElementById('root')
);

reportWebVitals();
