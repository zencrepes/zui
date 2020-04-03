import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

interface Props {
  onClick: Function;
}

const OpenButton: React.FC<Props> = (props: Props) => {
  const { onClick } = props;

  const clickButton = () => {
    onClick();
  };

  return (
    <IconButton aria-label="Open" onClick={clickButton}>
      <FolderOpenIcon />
    </IconButton>
  );
};

export default OpenButton;
