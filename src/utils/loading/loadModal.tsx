import React from 'react';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import LoadMessage from './loadMessage';

interface Props {
  cancelLoading: Function;
  loadingTitle: string | null;
}

const LoadModal: React.FC<Props> = (props: Props) => {
  const { cancelLoading, loadingTitle } = props;

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={true} fullWidth={true} maxWidth="sm">
      <DialogTitle id="simple-dialog-title">
        {loadingTitle === null ? (
          <React.Fragment>Loading ...</React.Fragment>
        ) : (
          <React.Fragment>{loadingTitle}</React.Fragment>
        )}
      </DialogTitle>
      <DialogContent>
        <LoadMessage />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            cancelLoading();
          }}
          color="primary"
          autoFocus
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoadModal;
