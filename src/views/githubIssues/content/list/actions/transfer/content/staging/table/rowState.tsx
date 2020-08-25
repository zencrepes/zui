import React from 'react';
import { connect } from 'react-redux';

import { makeStyles, createStyles } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';

import { iRootState } from '../../../../../../../../../store';

interface Props {
  issue: any;
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
  verifiedIssues: state.githubIssues.verifiedIssues,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const RowState: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { verifiedIssues, issue } = props;

  const issuestate: any = verifiedIssues.find((l: any) => l.id === issue.id);
  if (issuestate === undefined) {
    return <CircularProgress size={20} />;
  }
  if (issuestate.error === true) {
    return <Alert severity="error">{issuestate.errorMsg}</Alert>;
  } else {
    return <CheckIcon className={classes.iconVerified} />;
  }
};
export default connect(mapState, mapDispatch)(RowState);
