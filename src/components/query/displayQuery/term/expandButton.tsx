import React from 'react';

import Button from '@material-ui/core/Button';

interface Props {
  onClick: (value: boolean) => void;
  collapsed: boolean;
  length: number;
}

const ExpandButton: React.FC<Props> = (props: Props) => {
  const { onClick, collapsed, length } = props;

  const clickButton = () => {
    onClick(collapsed ? false : true);
  };

  if (collapsed && length > 2) {
    return (
      <Button color="primary" size="small" onClick={clickButton}>
        more...
      </Button>
    );
  } else if (!collapsed && length > 2) {
    return (
      <Button color="primary" size="small" onClick={clickButton}>
        less
      </Button>
    );
  }
  return null;
};

export default ExpandButton;
