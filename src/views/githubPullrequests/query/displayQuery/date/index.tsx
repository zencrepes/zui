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

const DateQuery: React.FC<Props> = (props: Props) => {
  const { op, value, facet, updateQuery } = props;
  const classes = useStyles();

  const operator = op === '>=' ? 'before' : 'after';
  return (
    <div className={classes.root}>
      <span>{facet.name} </span>
      <span>{operator} </span>
      <Value op={op} facet={facet} value={value} updateQuery={updateQuery} />
    </div>
  );
};

export default DateQuery;
