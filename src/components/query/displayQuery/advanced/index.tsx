import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

import Value from './value';

interface Props {
  filter: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: '5px',
  },
  query: {
    flex: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Term: React.FC<Props> = (props: Props) => {
  const { filter } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Value value={'Advanced Filter'} displayValue={'Advanced Filter (edit to see)'} filter={filter} />
    </div>
  );
};

export default Term;
