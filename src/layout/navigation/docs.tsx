import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import DescriptionIcon from '@material-ui/icons/Description';

const Docs: React.FC<any> = () => {
  return (
    <IconButton
      aria-label="Redirect to ZenCrepes documentation"
      // onClick={() => (window.location.href = 'https://docs.zencrepes.io/')}
      onClick={() => window.open('https://docs.zencrepes.io/', '_blank')}
      color="inherit"
    >
      <DescriptionIcon />
    </IconButton>
  );
};

export default Docs;
