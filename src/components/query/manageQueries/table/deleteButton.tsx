import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
  onClick: () => void;
}

const OpenButton: React.FC<Props> = (props: Props) => {
  const { onClick } = props;

  const clickButton = () => {
    onClick();
  };

  return (
    <IconButton aria-label="Clear" onClick={clickButton}>
      <DeleteIcon />
    </IconButton>
  );
};

export default OpenButton;
