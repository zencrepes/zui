import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { iRootState } from '../../../../../../../store';

const mapState = (state: iRootState) => ({
  verifiedRepos: state.githubRepositories.verifiedRepos,
  updateReposSelected: state.githubRepositories.updateReposSelected,
  updateCurrentStep: state.githubRepositories.updateCurrentStep,
});

const mapDispatch = (dispatch: any) => ({
  setLoadFlag: dispatch.githubRepositories.setLoadFlag,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const SubmitButton: React.FC<connectedProps> = (props: connectedProps) => {
  const [open, setOpen] = React.useState(false);

  const { verifiedRepos, updateReposSelected, setLoadFlag } = props;

  const submitChanges = () => {
    console.log('Submit changes');
    setLoadFlag(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // For submit to be possible, there must be no errors in verifiedRepos and same number of elements between verifiedRepos and updateReposSelected
  if (
    verifiedRepos.find((l: any) => l.error === true) !== undefined ||
    verifiedRepos.length !== updateReposSelected.length
  ) {
    const errors = verifiedRepos.filter((l: any) => l.error === true);
    return (
      <Button variant="contained" color="primary" disabled>
        {errors.length > 0 ? 'Submit (' + errors.length + ' errors )' : 'Submit'}
      </Button>
    );
  }
  return (
    <React.Fragment>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Submit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Submit changes to GitHub'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to submit changes to GitHub, this cannot be undone. Do not close your browser while the
            submission is in progress.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitChanges} color="primary" autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default connect(mapState, mapDispatch)(SubmitButton);
