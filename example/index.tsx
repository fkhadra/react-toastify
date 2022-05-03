import 'react-app-polyfill/ie11';
import { createRoot } from 'react-dom/client';
import * as React from 'react';
import { App } from './components/App';

import './index.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
