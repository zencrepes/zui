import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import { Facet } from '../../types';

interface Props {
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

const Value: React.FC<Props> = (props: Props) => {
  const { value, facet, updateQuery } = props;
  const classes = useStyles();

  const handleDelete = () => {
    if (updateQuery !== null) {
      updateQuery(null, facet);
    }
  };

  if (updateQuery !== null) {
    return <Chip onDelete={handleDelete} variant="outlined" label={value} className={classes.root} />;
  } else {
    return <Chip variant="outlined" label={value} className={classes.root} />;
  }
};

export default Value;
