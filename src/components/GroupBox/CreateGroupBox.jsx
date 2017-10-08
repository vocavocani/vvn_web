import React from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent, CardMedia} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

/**
 * Material-ui override
 */
const styles = {
  card: {
    minWidth: 150,
    minHeight: 150,
    maxHeight: 250,

    '&:hover': {
      cursor: 'pointer',
      opacity: 0.7,
    },
  },
  media: {
    backgroundSize: '100%',
    height: 150,
    maxHeight: 150,
  },
};

const CreateGroupBox = (props) => {
  const classes = props.classes;

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card className={classes.card}
            onClick={() => { props.history.push('/teams/create'); }}>
        <CardMedia
          image="https://www.materialui.co/materialIcons/content/add_circle_grey_192x192.png"
          className={classes.media}
        />
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

export default withStyles(styles)(CreateGroupBox);