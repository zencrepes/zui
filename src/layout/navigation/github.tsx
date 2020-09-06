import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';

const Github: React.FC<any> = () => {
  return (
    <IconButton
      aria-label="Redirect to GitHub issues"
      onClick={() => window.open('https://github.com/zencrepes/zencrepes/issues', '_blank')}
      color="inherit"
    >
      <GitHubIcon />
    </IconButton>
  );
};

export default Github;
