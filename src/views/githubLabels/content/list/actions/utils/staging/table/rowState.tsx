import React from 'react';
import { connect } from 'react-redux';

import { makeStyles, createStyles } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';

import { iRootState } from '../../../../../../../../store';

interface Props {
  label: any;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '300px',
    },
    iconVerified: {
      fontSize: 20,
      color: green[800],
    },
    iconError: {
      fontSize: 20,
      color: red[800],
    },
  }),
);

const mapState = (state: iRootState) => ({
  verifiedLabels: state.githubLabels.verifiedLabels,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const RowState: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { verifiedLabels, label } = props;

  const labelstate: any = verifiedLabels.find((l: any) => l.id === label.id);
  if (labelstate === undefined) {
    return <CircularProgress size={20} />;
  }
  if (labelstate.error === true) {
    return <Alert severity="error">{labelstate.errorMsg}</Alert>;
  } else {
    return <CheckIcon className={classes.iconVerified} />;
  }
};
export default connect(mapState, mapDispatch)(RowState);
