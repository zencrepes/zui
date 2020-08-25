import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { iRootState } from '../../../../../store';

const GQL_QUERY_VELOCITY = loader('../../../graphql/getVelocity.graphql');

const mapState = (state: iRootState) => ({
  defaultPoints: state.githubIssues.defaultPoints,
  query: state.githubIssues.query,
});

const mapDispatch = (dispatch: any) => ({
  setQueryVelocity: dispatch.githubIssues.setQueryVelocity,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const GetWeeklyVelocity: React.FC<connectedProps> = (props: connectedProps) => {
  const { query, setQueryVelocity } = props;

  const { data } = useQuery(GQL_QUERY_VELOCITY, {
    variables: {
      query: JSON.stringify(query),
      moving: 4,
      interval: 'week',
    },
  });

  useEffect(() => {
    if (data !== undefined) {
      setQueryVelocity(data.githubIssues.data.velocity);
    }
  });

  return null;
};
export default connect(mapState, mapDispatch)(GetWeeklyVelocity);
