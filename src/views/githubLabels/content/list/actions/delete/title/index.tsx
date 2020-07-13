import React from 'react';

import { connect } from 'react-redux';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { iRootState } from '../../../../../../../store';

export interface DialogTitleProps {
  children: React.ReactNode;
}

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
  openEditModal: state.githubLabels.openEditModal,
});

const mapDispatch = (dispatch: any) => ({
  setOpenEditModal: dispatch.githubLabels.setOpenEditModal,
  setLoading: dispatch.loading.setLoading,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & DialogTitleProps;

const Title: React.FC<connectedProps> = (props: connectedProps) => {
  const { setOpenEditModal, children, setLoading } = props;
  const classes = useStyles();

  const onClose = () => {
    setOpenEditModal(false);
    setLoading(false);
  };

  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
};
export default connect(mapState, mapDispatch)(Title);
