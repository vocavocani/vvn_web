import React, { Component } from 'react';

import { Grid, Typography, Card, CardActions, CardHeader, CardContent, CardMedia } from 'material-ui';
import TopBar from '../TopBar/TopBar.jsx'
import GroupBox from '../GroupBox/GroupBox.jsx'
import CreateGroupBox from '../GroupBox/CreateGroupBox.jsx'

import api from '../../actions/Api';

import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: []
    };
    this._getTeamList();
  }

  _getTeamList() {
    api.get('/api/team', true)
      .then((data) => {
        this.setState({ groups: data });
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    console.log(this.state.groups);
    return (
      <div>
        <TopBar history={this.props.history} />
        <Grid
          container
          gutter={24}
          direction="row"
          align="flex-start"
          justify="flex-start"
          className="inner-content"
        >
          {this.state.groups.map((group, i) => {
            return (
              <GroupBox
                group={group}
                key={i}
              />
            );
          })}
          <CreateGroupBox />
        </Grid>
      </div>
    );
  }
}
export default Home;