import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>
  , document.getElementById('main'));

if (module.hot) {
  module.hot.accept('./components/App.jsx', AppContainer);
}