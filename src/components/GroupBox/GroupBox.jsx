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

const GroupBox = (props) => {
  const classes = props.classes;

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://avatars0.githubusercontent.com/u/10248850"
        />
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

export default withStyles(styles)(GroupBox);