import React, {Component} from 'react';

import {Grid} from 'material-ui';
import styled from 'styled-components';

import TopBar from '../TopBar/TopBar.jsx';
import GroupBox from '../GroupBox/GroupBox.jsx';
import CreateGroupBox from '../GroupBox/CreateGroupBox.jsx';

import api from '../../actions/Api';

/**
 * Styled Components
 */
const InnerContents = styled.div`
  padding-top: 50px;
  padding-left: 10%;
  padding-right: 10%;
`;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: []
    };
    this._getTeamList();
  }

  _getTeamList() {
    api.get('/api/teams', true)
      .then((data) => {
        // 임시 테그
        data.forEach((group) => {
          group.tags = ["토익", "탭스", "수능"];
        });

        this.setState({groups: data});
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return [
      <TopBar history={this.props.history}/>,
      <InnerContents>
        <Grid
          container
          direction="row"
          align="flex-start"
          justify="flex-start"
          spacing={40}
        >
          {this.state.groups.map((group, i) => {
            return (
              <GroupBox
                group={group}
                key={i}
              />
            );
          })}
          <CreateGroupBox history={this.props.history}/>
        </Grid>
      </InnerContents>
    ];
  }
}

export default Home;