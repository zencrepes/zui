import React from 'react';
import { connect } from 'react-redux';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { iRootState } from '../../../../../../../store';
import Columns from './columns';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  }),
);

const mapState = (state: iRootState) => ({
  openComparisonTableConfigModal: state.testingPerfs.openComparisonTableConfigModal,
});

const mapDispatch = (dispatch: any) => ({
  setOpenComparisonTableConfigModal: dispatch.testingPerfs.setOpenComparisonTableConfigModal,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const TableConfigModal: React.FC<connectedProps> = (props: connectedProps) => {
  const { openComparisonTableConfigModal, setOpenComparisonTableConfigModal } = props;
  const classes = useStyles();

  const handleClose = () => {
    setOpenComparisonTableConfigModal(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={false}
        maxWidth={'xl'}
        open={openComparisonTableConfigModal}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <MuiDialogTitle disableTypography className={classes.root}>
          <Typography variant="h6">Hide or show table columns</Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent>
          <Columns />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
export default connect(mapState, mapDispatch)(TableConfigModal);
