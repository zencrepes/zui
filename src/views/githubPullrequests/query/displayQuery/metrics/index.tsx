import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Facet } from '../../types';

import Value from './value';
interface Props {
  filter: any;
  facet: Facet;
  removeFilter: Function | null;
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
  const { filter, facet, removeFilter } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span>{facet.name} </span>
      <span>{filter.op} </span>
      <Value filter={filter} removeFilter={removeFilter} />
    </div>
  );
};

export default Metrics;