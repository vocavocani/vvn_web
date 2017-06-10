import React, { Component } from 'react';
import { TextField, Button, Grid, Paper } from 'material-ui';

import api from '../../actions/Api';

import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this._auth();
  }

  _auth() {
    if (localStorage.getItem('vvn_token')) {
      return this.props.history.push('/');
    }
  }

  login(e) {
    e.preventDefault()

    const login_data = {
      id: e.target.id.value,
      pw: e.target.pw.value
    }

    api.post('/api/user/login', login_data, false)
      .then((data) => {
        localStorage.setItem('vvn_token', data.token);
        this.props.history.push('/');
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  render() {
    return (
      <div className="container">
        <Grid
          container
          gutter={24}
          align="center"
          direction="row"
          justify="center"
        >
          <Grid item xs={8} sm={6}>
            <Paper>
              <h1 className="title">VocaVocaNi</h1>
              <form onSubmit={this.login.bind(this)} className="form-group">
                <TextField
                  required
                  id="id"
                  name="id"
                  label="ID"
                  className="input"
                /><br />
                <TextField
                  required
                  id="pw"
                  name="pw"
                  type="password"
                  label="Password"
                  className="input"
                /><br />
                <div className="btn-group">
                  <Button raised primary className="btn" type="submit">로그인</Button>
                  <Button raised className="btn"
                    onClick={() => { this.props.history.push('/register'); }}>
                    회원가입
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default Login;