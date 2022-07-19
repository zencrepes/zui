import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import { iRootState } from '../../../../../../../store';

import Description from './description';
import Analysis from './analysis';
import Group from './group';
import ApplyButton from './applyButton';

const GQL_QUERY = loader('./getRunById.graphql');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      width: 700,
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    gridRoot: {
      marginTop: 10,
    },
    textarea: {
      width: '100%',
    },
  }),
);

const mapState = (state: iRootState) => ({
  openEditRunId: state.testingPerfs.openEditRunId,
});

const mapDispatch = (dispatch: any) => ({
  setOpenEditRunModal: dispatch.testingPerfs.setOpenEditRunModal,
  setOpenEditRun: dispatch.testingPerfs.setOpenEditRun,
});

interface Props {
  updateRunField: (content: { field: string; value: any }[]) => void;
}

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const EditRunModal: React.FC<connectedProps> = (props: connectedProps) => {
  const { openEditRunId, setOpenEditRunModal, setOpenEditRun, updateRunField } = props;
  const classes = useStyles();

  const { data, loading } = useQuery(GQL_QUERY, {
    variables: {
      id: openEditRunId,
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data !== undefined && data.testingPerfs.data.item !== null) {
      setOpenEditRun(data.testingPerfs.data.item);
    }
    if (loading) {
      setOpenEditRun({});
    }
  });

  const handleClose = () => {
    setOpenEditRunModal(false);
  };

  if (!loading && data) {
    const run = data.testingPerfs.data.item;
    return (
      <>
        <DialogTitle className={classes.root}>Edit Run: {run.name}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">
            Run started on: {format(parseISO(run.startedAt), 'LLL do yyyy - HH:mm')}
          </Typography>
          <Grid container spacing={1} className={classes.gridRoot} justify="flex-start" alignItems="flex-start">
            <Grid item xs={12}>
              <Group />
            </Grid>
            <Grid item xs={12}>
              <Analysis />
            </Grid>
            <Grid item xs={12}>
              <Description />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
          <ApplyButton sourceRun={run} updateRunField={updateRunField} />
        </DialogActions>
      </>
    );
  }
  return null;
};
export default connect(mapState, mapDispatch)(EditRunModal);
