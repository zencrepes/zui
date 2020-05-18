import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Facet } from '../../../../global';

import Value from './value';
interface Props {
  filter: any;
  facet: Facet;
  removeFilter: Function | null;
}

const useStyles = makeStyles(() => ({
  root: {
    marginLeft: '5px',
  },
  query: {
    flex: 1,
  },
}));

const DateQuery: React.FC<Props> = (props: Props) => {
  const { filter, facet, removeFilter } = props;
  const classes = useStyles();

  const operator = filter.op === '>=' ? 'after' : 'before';
  return (
    <div className={classes.root}>
      <span>{facet.name} </span>
      <span>{operator} </span>
      <Value filter={filter} removeFilter={removeFilter} />
    </div>
  );
};

export default DateQuery;
