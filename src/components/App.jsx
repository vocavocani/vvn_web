import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { injectGlobal } from 'styled-components';

import { createMuiTheme } from 'material-ui/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from './Home/Home.jsx';
import EmailLogin from './Login/EmailLogin.jsx';
import Register from './Login/Register.jsx';
import CreateGroup from './Group/CreateGroup.jsx';

/**
 * Styled Components
 */
injectGlobal`
  body {
    margin: 0;
    background-color: #f2f4f7;
  }
`;

const theme = createMuiTheme();

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={EmailLogin} />
            <Route path='/register' component={Register} />

            <Route path='/teams/create' component={CreateGroup} />
          </Switch>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;