import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home/Home.jsx'
import Login from './Login/Login.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;