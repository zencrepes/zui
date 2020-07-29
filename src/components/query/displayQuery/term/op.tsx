import React from 'react';

import Button from '@material-ui/core/Button';

interface Props {
  filter: any;
  replaceFilter: Function | null;
}

const Op: React.FC<Props> = (props: Props) => {
  const { filter, replaceFilter } = props;

  const clickUpdateFilter = () => {
    const newOp = filter.op === 'in' ? 'all' : 'in';
    if (replaceFilter !== null) {
      replaceFilter({ ...filter, op: newOp });
    }
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      size="small"
      onClick={clickUpdateFilter}
      disabled={replaceFilter === null}
    >
      {filter.op === 'in' ? 'in' : 'all of'}
    </Button>
  );
};

export default Op;
