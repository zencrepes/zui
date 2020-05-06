import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import blue from '@material-ui/core/colors/blue';

import { Metrics, Facet } from './types';
import { Typography } from '@material-ui/core';

import MetricsSlider from './slider';

interface Props {
  facet: Facet;
  metrics: Metrics;
  updateMetricsRange: Function;
  defaultPoints: boolean;
}

const useStyles = makeStyles(() => ({
  root: {
    width: '300px',
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

const NumberFacet: React.FC<Props> = (props: Props) => {
  const { facet, metrics, updateMetricsRange } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card style={cardStyle}>
        <CardContent>
          <Typography>{facet.name}</Typography>
        </CardContent>
        <CardContent style={cardContentStyle}>
          <MetricsSlider metrics={metrics} updateMetricsRange={updateMetricsRange} facet={facet} />
        </CardContent>
      </Card>
    </div>
  );
};

export default NumberFacet;
