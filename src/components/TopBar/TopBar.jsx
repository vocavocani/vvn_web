import React from 'react';
import { AppBar, Toolbar, Typography, Button } from 'material-ui';

import './TopBar.css'

const TopBar = ({history}) => {
  const logout = () => {
    localStorage.removeItem('vvn_token');
    history.push('/login');
  }

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography type="title" colorInherit className='top-bar-title'>VocaVocaNi</Typography>
          <Button contrast onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;