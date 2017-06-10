import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App.jsx';

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>
  , document.getElementById('main'));

if (module.hot) {
  module.hot.accept('./components/App.jsx', AppContainer);
}