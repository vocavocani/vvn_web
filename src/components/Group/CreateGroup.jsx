import React, { Component } from 'react';

import { TextField, Grid, Paper } from 'material-ui';
import styled from 'styled-components';

import TopBar from '../TopBar/TopBar.jsx';
import api from '../../actions/Api';

/**
 * Styled Components
 */
const Container = styled.div`
  text-align: center;
  
  h1 {
    padding-top: 50px;
  }
  
  @media (min-width: 1024px){
    margin-top: 100px;
  }
`;

const ButtonGroup = styled.div`
  padding-top: 50px;
  padding-bottom: 20px;
`;

const Button = styled.button`
  width: 90%;
  height: 40px;
  margin: 10px;
	font-size: 1em;
	border-radius: 3px;

	color: white;
	border: 2px solid ${props => props.bgColor};
	background-color: ${props => props.bgColor};
	
	&:hover {
		cursor: pointer;
		opacity: 0.5;
	}
`;

/**
 * Material-ui override
 */
const textFieldStyle = {
  width: '80%',
  margin: '20px 0 0 0',
};

class CreateGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TopBar history={this.props.history}/>
        <Grid
          container
          align="center"
          direction="row"
          justify="center"
        >
          <Grid item xs={10} sm={4}>
            <Paper>
              <h1>VocaVocaNi</h1>
              <form>
                <TextField
                  required
                  id="id"
                  name="id"
                  label="ID"
                  style={textFieldStyle}
                /><br />
                <TextField
                  required
                  id="nickname"
                  name="nickname"
                  label="Nickname"
                  style={textFieldStyle}
                /><br />
                <TextField
                  required
                  id="pw_1"
                  name="pw_1"
                  type="password"
                  label="Password"
                  style={textFieldStyle}
                /><br />
                <TextField
                  required
                  id="pw_2"
                  name="pw_2"
                  type="password"
                  label="Password"
                  style={textFieldStyle}
                /><br />
                <ButtonGroup>
                  <Button type="submit" bgColor={'RoyalBlue'}>생성</Button>
                </ButtonGroup>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CreateGroup;