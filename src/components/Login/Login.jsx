import React, { Component } from 'react';
import api from '../../actions/Api'

class Home extends React.Component {

  login(e) {
    e.preventDefault()

    const login_data = {
      id: e.target.id.value,
      pw: e.target.pw.value
    }

    api.post('/api/user/login', login_data, false)
      .then((data) => {
        console.log(data);
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
export default Home;