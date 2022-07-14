import React from 'react';
import ReactDOM from 'react-dom/client';
// import { HashRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './vendor/normalize.css';
import './vendor/fonts.css';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <HashRouter>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </HashRouter>
  
// );
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();