import React, { Component } from 'react';
import { TextField, Button, Grid, Paper } from 'material-ui';

import api from '../../actions/Api';

import './Login.css';

class Register extends React.Component {
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

    const register_data = {
      id: e.target.id.value,
      nickname: e.target.nickname.value,
      pw_1: e.target.pw_1.value,
      pw_2: e.target.pw_2.value
    }

    api.post('/api/user/register', register_data, false)
      .then((data) => {
        console.log(data);
        this.props.history.push('/login');
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
                  id="nickname"
                  name="nickname"
                  label="Nickname"
                  className="input"
                /><br />
                <TextField
                  required
                  id="pw_1"
                  name="pw_1"
                  type="password"
                  label="Password"
                  className="input"
                /><br />
                <TextField
                  required
                  id="pw_2"
                  name="pw_2"
                  type="password"
                  label="Password"
                  className="input"
                /><br />
                <div className="btn-group">
                  <Button raised primary className="btn" type="submit">회원가입</Button>
                  <Button raised className="btn"
                    onClick={() => { this.props.history.push('/login'); }}>
                    로그인 화면
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
export default Register;