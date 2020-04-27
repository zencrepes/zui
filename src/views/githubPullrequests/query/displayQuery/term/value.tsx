import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

interface Props {
  value: string;
  filter: any;
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

const Value: React.FC<Props> = (props: Props) => {
  const { value, removeFilter, filter } = props;
  const classes = useStyles();

  const handleDelete = () => {
    if (removeFilter !== null) {
      if (Array.isArray(filter.content.value)) {
        // In that case we need to create a filter with just the values to remove
        if (filter.content.value.length > 1) {
          const soloFilter = {
            ...filter,
            content: {
              ...filter.content,
              value: [value],
            },
          };
          removeFilter(soloFilter);
        } else {
          removeFilter(filter);
        }
      } else {
        removeFilter(filter);
      }
    }
  };

  if (removeFilter !== null) {
    return <Chip onDelete={handleDelete} variant="outlined" label={value} className={classes.root} />;
  } else {
    return <Chip variant="outlined" label={value} className={classes.root} />;
  }
};

export default Value;
