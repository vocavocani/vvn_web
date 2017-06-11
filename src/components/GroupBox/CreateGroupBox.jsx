import React from 'react';
import { Grid, Typography, Card, CardActions, CardHeader, CardContent, CardMedia } from 'material-ui';

import './GroupBox.css';

const GroupBox = () => {
  return (
    <Grid item xs={12} sm={3} className='group-box'>
      <Card>
        <CardMedia>
          <img src='https://www.materialui.co/materialIcons/content/add_circle_grey_192x192.png' className='main-image' />
        </CardMedia>
        <CardContent>
          <Typography type="headline" component="h2">
            그룹을 만드세요!
          </Typography>
          <Typography component="p">
            <br/>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default GroupBox;