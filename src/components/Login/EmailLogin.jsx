import React, { Component } from 'react';
import { TextField, Grid, Paper } from 'material-ui';
import styled from 'styled-components';
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

class EmailLogin extends Component {
  constructor(props) {
    super(props);

    this._auth();
  }

  _auth() {
    if (localStorage.getItem('token')) {
      return this.props.history.push('/');
    }
  }

  login(e) {
    e.preventDefault();

    const login_data = {
      id: e.target.id.value,
      pw: e.target.pw.value
    };

    api.post('/api/users/login', login_data, false)
      .then((data) => {
        localStorage.setItem('token', data.token);
        this.props.history.push('/');
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  render() {
    return (
      <Container>
        <Grid
          container
          align="center"
          direction="row"
          justify="center"
        >
          <Grid item xs={10} sm={4}>
            <Paper>
              <h1>VocaVocaNi</h1>
              <form onSubmit={this.login.bind(this)}>
                <TextField
                  required
                  id="id"
                  name="id"
                  label="ID"
                  style={textFieldStyle}
                /><br />
                <TextField
                  required
                  id="pw"
                  name="pw"
                  type="password"
                  label="Password"
                  style={textFieldStyle}
                /><br />
                <ButtonGroup>
                  <Button type="submit" bgColor={'RoyalBlue'}>로그인</Button>
                  <Button type="button" bgColor={'grey'}
                    onClick={() => { this.props.history.push('/register'); }}>
                    회원가입
                  </Button>
                </ButtonGroup>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
export default EmailLogin;