import React from 'react';

// import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

interface Props {
  filter: any;
  replaceFilter?: (filter: any) => void;
}

const Op: React.FC<Props> = (props: Props) => {
  const { filter, replaceFilter } = props;

  const clickUpdateFilter = () => {
    let newOp = 'in';
    if (filter.op === 'in') {
      newOp = 'all';
    } else if (filter.op === 'all') {
      newOp = 'not-in';
    }
    // const newOp = filter.op === 'in' ? 'all' : 'in';
    if (replaceFilter !== undefined) {
      replaceFilter({ ...filter, op: newOp });
    }
  };

  return <Chip size="small" label={filter.op} onClick={clickUpdateFilter} disabled={replaceFilter === null} />;
};

export default Op;
