import React, { Component } from 'react';
import api from '../../actions/Api';

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
      <div>
        <form onSubmit={this.login.bind(this)}>
          <input id='id' name='id' type='text' />
          <input id='pw' name='pw' type='password' />
          <button id='login-btn'>로그인</button>
        </form>
      </div>
    );
  }
}
export default Login;