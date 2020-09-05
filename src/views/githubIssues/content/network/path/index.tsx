import React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DirectionsIcon from '@material-ui/icons/Directions';
import ClearIcon from '@material-ui/icons/Clear';

import { iRootState } from '../../../../../store';
import DataCard from '../../../../../components/dataCard';

import IssueLink from './issueLink';

const useStyles = makeStyles((theme) => ({
  button: {
    color: '#fff',
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
}));

const mapState = (state: iRootState) => ({
  networkPathStart: state.githubIssues.networkPathStart,
  networkPathEnd: state.githubIssues.networkPathEnd,
});

const mapDispatch = (dispatch: any) => ({
  buildNetworkPath: dispatch.githubIssues.buildNetworkPath,
  clearNetworkPath: dispatch.githubIssues.clearNetworkPath,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Path: React.FC<connectedProps> = (props: connectedProps) => {
  const { networkPathStart, networkPathEnd, buildNetworkPath, clearNetworkPath } = props;
  const classes = useStyles();

  const nodeStart: any = networkPathStart;
  const nodeEnd: any = networkPathEnd;
  return (
    <DataCard title="Shortest Path">
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        spacing={1}
        style={{ textAlign: 'left' }}
      >
        <Grid item>
          <span>
            <u>Start:</u> {Object.values(nodeStart).length > 0 && <IssueLink issue={nodeStart.data()} />}
          </span>
        </Grid>
        <Grid item>
          <span>
            <u>End:</u> {Object.values(nodeEnd).length > 0 && <IssueLink issue={nodeEnd.data()} />}
          </span>
        </Grid>
        <Grid container>
          <Grid container direction="row" justify="space-evenly" alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                onClick={buildNetworkPath}
                disabled={Object.values(networkPathStart).length === 0 || Object.values(networkPathEnd).length === 0}
              >
                <DirectionsIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                Draw
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                onClick={clearNetworkPath}
                disabled={Object.values(networkPathStart).length === 0 || Object.values(networkPathEnd).length === 0}
              >
                <ClearIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                Clear
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DataCard>
  );
};

export default connect(mapState, mapDispatch)(Path);
