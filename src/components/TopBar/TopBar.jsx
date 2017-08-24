import React from 'react';
import {withStyles} from 'material-ui/styles';
import {AppBar, Toolbar, Typography, Button} from 'material-ui';
import styled from 'styled-components';

/**
 * Styled Components
 */
const InnerContents = styled.div`
  padding-left: 10%;
  padding-right: 10%;
  color: white;
`;

/**
 * Material-ui override
 */
const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
    color: 'white',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  whiteColor: {
    color: 'white'
  }
};

const TopBar = (props) => {
  const classes = props.classes;

  const logout = () => {
    localStorage.removeItem('token');
    props.history.push('/login');
  };

  const goHome = () => {
    props.history.push('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <InnerContents>
        <Toolbar>
          <Typography type="title"
                      onClick={goHome}
                      className={classes.flex}>
            VocaVocaNi
          </Typography>
          <Button onClick={logout}
                  className={classes.whiteColor}
          >Logout</Button>
        </Toolbar>
        </InnerContents>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(TopBar);