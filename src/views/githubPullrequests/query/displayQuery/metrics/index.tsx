import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Facet } from '../../types';

import Value from './value';
interface Props {
  op: string;
  value: string;
  facet: Facet;
  updateQuery: Function | null;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '5px',
  },
  query: {
    flex: 1,
  },
}));

const Metrics: React.FC<Props> = (props: Props) => {
  const { op, value, facet, updateQuery } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span>{facet.name} </span>
      <span>{op} </span>
      <Value key={value} facet={facet} value={value} updateQuery={updateQuery} />
    </div>
  );
};

export default Metrics;
