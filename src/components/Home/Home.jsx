import React, { Component } from 'react';
import api from '../../actions/Api';

import TopBar from '../TopBar/TopBar.jsx'

class Home extends React.Component {
  constructor(props) {
    super(props);

    this._getTeamList();
  }

  _getTeamList() {
    api.get('/api/team', true)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      alert(error);
    });
  }

  render() {
    return (
      <div>
        <TopBar history={this.props.history} />
        <h1>VocaVocaNi Home</h1>
      </div>
    );
  }
}
export default Home;