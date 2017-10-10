import React from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent, CardMedia} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {Grid, Chip} from 'material-ui';
import styled from 'styled-components';

/**
 * Styled Components
 */
const TagsWrapper = styled.div`
  display: flex;
  justifyContent: center;
  flexWrap: wrap;
  margin-top: 10px;
`;

/**
 * Material-ui override
 */
const styles = {
  card: {
    height: 250,
    minWidth: 150,
    minHeight: 150,
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

const tagItem = {
  cursor: "pointer",
  marginRight: '10px'
};

const GroupBox = (props) => {
  const classes = props.classes;

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={
            props.group.team_image ?
              props.group.team_image :
              "https://avatars0.githubusercontent.com/u/10248850"
          }
        />
        <CardContent>
          <Typography type="headline" component="h2">
            {props.group.team_name}
          </Typography>
          <TagsWrapper>
            {props.group.tags.map((tag, i) => {
              return (<Chip label={tag} key={i} style={tagItem}/>);
            })}
          </TagsWrapper>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(GroupBox);