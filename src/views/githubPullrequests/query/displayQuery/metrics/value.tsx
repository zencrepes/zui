import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

interface Props {
  filter: any;
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

const Value: React.FC<Props> = (props: Props) => {
  const { filter, removeFilter } = props;
  const classes = useStyles();

  const handleDelete = () => {
    if (removeFilter !== null) {
      removeFilter(filter);
    }
  };

  if (removeFilter !== null) {
    return <Chip onDelete={handleDelete} variant="outlined" label={filter.content.value} className={classes.root} />;
  } else {
    return <Chip variant="outlined" label={filter.content.value} className={classes.root} />;
  }
};

export default Value;