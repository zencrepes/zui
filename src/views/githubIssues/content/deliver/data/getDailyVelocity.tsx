import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { iRootState } from '../../../../../store';

const GQL_QUERY_VELOCITY = loader('../../../graphql/getVelocity_old.graphql');

const mapState = (state: iRootState) => ({
  defaultPoints: state.githubIssues.defaultPoints,
  query: state.githubIssues.query,
});

const mapDispatch = (dispatch: any) => ({
  setQueryVelocityDaily: dispatch.githubIssues.setQueryVelocityDaily,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const GetWeeklyVelocity: React.FC<connectedProps> = (props: connectedProps) => {
  const { query, setQueryVelocityDaily } = props;

  const { data } = useQuery(GQL_QUERY_VELOCITY, {
    variables: {
      field: 'closedAt',
      query: JSON.stringify(query),
      aggType: 'date_histogram',
      aggOptions: JSON.stringify({
        calendarInterval: 'day',
        movingWindow: 20,
        sumField: 'points',
      }),
    },
  });

  useEffect(() => {
    if (data !== undefined) {
      setQueryVelocityDaily(data.githubIssues.data.velocity.buckets);
    }
  });

  return null;
};
export default connect(mapState, mapDispatch)(GetWeeklyVelocity);
