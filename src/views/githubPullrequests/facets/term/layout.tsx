import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import blue from '@material-ui/core/colors/blue';

import Selector from './selector';
import ExpandButton from './expandButton';

import { Bucket, Facet } from './types';
import { Typography } from '@material-ui/core';

interface Props {
  facet: Facet;
  buckets: Bucket[];
  clickedItem: Function;
  selectedValues: string[];
  defaultPoints: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '250px',
    marginTop: '10px',
  },
}));

const cardStyle = {
  borderLeft: '4px solid ' + blue[900],
  borderTop: '1px solid #ccc',
  borderRadius: '0px',
  background: '#fafafa',
};

const cardContentStyle = {
  padding: '0px',
};

const TermFacet: React.FC<Props> = (props: Props) => {
  const { facet, buckets, clickedItem, selectedValues, defaultPoints } = props;

  const classes = useStyles();
  const [collapsed, setCollapsed] = React.useState(true);

  const facetData = collapsed ? buckets.slice(0, 5) : buckets;

  return (
    <div className={classes.root}>
      <Card style={cardStyle}>
        <CardContent>
          <Typography>{facet.name}</Typography>
        </CardContent>
        <CardContent style={cardContentStyle}>
          <List dense={true}>
            {facetData.map((bucket: Bucket) => (
              <Selector
                data={bucket}
                key={bucket.key}
                defaultPoints={defaultPoints}
                nullValue={facet.nullValue}
                clickItem={clickedItem}
                selected={selectedValues.includes(bucket.key)}
              />
            ))}
          </List>
        </CardContent>
        <CardActions>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={8}>
            <Grid item xs={12} sm container></Grid>
            <Grid item>
              <ExpandButton collapsed={collapsed} length={buckets.length} onClick={setCollapsed} />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};

export default TermFacet;
