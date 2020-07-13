import React from 'react';

import { connect } from 'react-redux';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { iRootState } from '../../../../../../store';

import Repos from '../utils/repos';
import Stepper from './stepper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
  }),
);

const mapState = (state: iRootState) => ({
  openEditModal: state.githubLabels.openEditModal,
  editAction: state.githubLabels.editAction,
});

const mapDispatch = (dispatch: any) => ({
  setOpenEditModal: dispatch.githubLabels.setOpenEditModal,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const ActionModal: React.FC<connectedProps> = (props: connectedProps) => {
  const { openEditModal, setOpenEditModal, editAction } = props;

  if (editAction === 'delete') {
    return null;
  }

  const handleClose = () => {
    setOpenEditModal(false);
  };

  return (
    <React.Fragment>
      {openEditModal && <Repos />}
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={openEditModal}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Bulk {editAction}</DialogTitle>
        <DialogContent>
          <Stepper />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default connect(mapState, mapDispatch)(ActionModal);
