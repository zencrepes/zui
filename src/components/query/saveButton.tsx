import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';

interface Props {
  onClick: Function;
}

const SaveButton: React.FC<Props> = (props: Props) => {
  const { onClick } = props;

  const clickButton = () => {
    onClick();
  };

  return (
    <IconButton aria-label="Clear" onClick={clickButton}>
      <SaveIcon />
    </IconButton>
  );
};

export default SaveButton;
