import 'react-app-polyfill/ie11';
import { render } from 'react-dom';
import * as React from 'react';
import { App } from './components/App';

import './index.css';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
