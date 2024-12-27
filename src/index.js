import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MovieAppProvider from './context/MovieContext';
import { Provider } from 'react-redux';
import store from './redux/store'; // Redux store importu

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MovieAppProvider>
        <App />
      </MovieAppProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
