import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import DataCard from '../../../../../components/dataCard';

import { iRootState } from '../../../../../store';

import GetAggs from '../data/getAggs';

import SelectSprint from './selectSprint';
import SelectProject from './selectProject';
import SelectMilestone from './selectMilestone';

const mapState = (state: iRootState) => ({
  query: state.githubIssues.query,
});

const mapDispatch = (dispatch: any) => ({
  setQueryLabelsAggs: dispatch.githubIssues.setQueryLabelsAggs,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps;

const Controls: React.FC<connectedProps> = (props: connectedProps) => {
  const { history, setQueryLabelsAggs, query } = props;

  const pushNewQuery = (modifiedQuery: any) => {
    history.push({
      pathname: '/githubIssues',
      search: '?q=' + encodeURIComponent(JSON.stringify(modifiedQuery)),
      state: { detail: modifiedQuery },
    });
  };

  return (
    <DataCard>
      <GetAggs
        field="labels.edges.node.name.keyword"
        setDataBuckets={setQueryLabelsAggs}
        remainingQuery={query}
        disjoint={true}
        tag={'plan'}
      />
      <Grid container direction="column" justify="space-evenly" alignItems="flex-start">
        <Grid item>
          <SelectProject pushNewQuery={pushNewQuery} />
        </Grid>
        <Grid item>
          <SelectMilestone pushNewQuery={pushNewQuery} />
        </Grid>
        <Grid item>
          <SelectSprint pushNewQuery={pushNewQuery} />
        </Grid>
      </Grid>
    </DataCard>
  );
};

export default withRouter(connect(mapState, mapDispatch)(Controls));
