import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';

import LoadMessage from './loadMessage';

const LoadSnackbar: React.FC = () => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={true}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<LoadMessage />}
    />
  );
};

export default LoadSnackbar;
