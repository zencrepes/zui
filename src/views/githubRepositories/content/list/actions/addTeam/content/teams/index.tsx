import React from 'react';
import { connect } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { iRootState } from '../../../../../../../../store';

import SelectTeam from './selectTeam';
import SelectPermission from './selectPermission';

interface Props {
  reposAvailable: { value: string; label: string };
  updateReposSelected: string[];
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '300px',
    },
  }),
);

const mapState = (state: iRootState) => ({
  githubToken: state.global.githubToken,
  githubClient: state.global.githubClient,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Teams: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { githubToken, githubClient } = props;

  if (githubToken !== null) {
    return (
      <div className={classes.root}>
        <ApolloProvider client={githubClient}>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
            <Grid item xs={4} sm container></Grid>
            <Grid item xs={4} sm container>
              <SelectTeam />
              <SelectPermission />
            </Grid>
            <Grid item xs={4} sm container></Grid>
          </Grid>
        </ApolloProvider>
      </div>
    );
  } else {
    return null;
  }
};
export default connect(mapState, mapDispatch)(Teams);
