import React from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  query: object;
}

const DisplayRawQuery: React.FC<Props> = (props: Props) => {
  const { query } = props;
  const [dialogOpenState, setDialogOpenState] = React.useState(false);

  const openCloseDialog = () => {
    setDialogOpenState(!dialogOpenState);
  };

  return (
    <React.Fragment>
      <IconButton aria-label="Help" onClick={openCloseDialog}>
        <HelpIcon />
      </IconButton>
      <Dialog
        open={dialogOpenState}
        onClose={openCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Current Query</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{JSON.stringify(query)}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={openCloseDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DisplayRawQuery;
