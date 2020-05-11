import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

interface Props {
  onClick: Function;
}

const OpenButton: React.FC<Props> = (props: Props) => {
  const { onClick } = props;

  const clickButton = () => {
    onClick();
  };

  return (
    <IconButton aria-label="Clear" onClick={clickButton}>
      <AddCircleIcon />
    </IconButton>
  );
};

export default OpenButton;
