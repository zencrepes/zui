import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

interface Props {
  filter: any;
  removeFilter?: (filter: any) => void;
}

const useStyles = makeStyles(() => ({
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
    if (removeFilter !== undefined) {
      removeFilter(filter);
    }
  };

  if (removeFilter !== undefined) {
    return (
      <Chip
        size="small"
        onDelete={handleDelete}
        variant="outlined"
        label={format(parseISO(filter.content.value), 'LLL do yyyy')}
        className={classes.root}
      />
    );
  } else {
    return <Chip variant="outlined" label={filter.content.value} className={classes.root} />;
  }
};

export default Value;
