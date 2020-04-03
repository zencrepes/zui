import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

interface Props {
  onClick: Function;
}

const ClearButton: React.FC<Props> = (props: Props) => {
  const { onClick } = props;

  const clickButton = () => {
    onClick();
  };

  return (
    <IconButton aria-label="Clear" onClick={clickButton}>
      <ClearIcon />
    </IconButton>
  );
};

export default ClearButton;
