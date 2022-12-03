import ReactDOM from 'react-dom/client';
import Snowfall from 'react-snowfall';
import reportWebVitals from './reportWebVitals';

import App from './App';

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App />
);

reportWebVitals();
