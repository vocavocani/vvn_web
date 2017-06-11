import React from 'react';
import { Grid, Typography, Card, CardActions, CardHeader, CardContent, CardMedia } from 'material-ui';

import './GroupBox.css';

const GroupBox = (props) => {
  return (
    <Grid item xs={12} sm={3} className='group-box'>
      <Card>
        <CardMedia>
          <img src='https://avatars0.githubusercontent.com/u/10248850' className='main-image' />
        </CardMedia>
        <CardContent>
          <Typography type="headline" component="h2">
            {props.group.team_name}
          </Typography>
          <Typography component="p">
            Category - {props.group.team_category_title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default GroupBox;