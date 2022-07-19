import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { iRootState } from '../../../../../../store';

const GQL_QUERY = loader('./getQueries.graphql');

const mapState = (state: iRootState) => ({
  query: state.testingPerfs.query,
});

const mapDispatch = (dispatch: any) => ({
  setLoading: dispatch.global.setLoading,
  setAvailableRuns: dispatch.testingPerfs.setAvailableRuns,
  setSelectedRunId: dispatch.testingPerfs.setSelectedRunId,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const AvailableRuns: React.FC<connectedProps> = (props: connectedProps) => {
  const { setAvailableRuns, query, setSelectedRunId, setLoading } = props;

  const { data, loading } = useQuery(GQL_QUERY, {
    variables: {
      query: JSON.stringify(query),
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data !== undefined) {
      const runs = data.testingPerfs.data.items.nodes
        .slice()
        .sort((a: any, b: any) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime());
      setAvailableRuns(runs);
      if (runs.length > 0) {
        setSelectedRunId(runs[runs.length - 1].id);
      } else {
        setSelectedRunId('');
      }
    }
    if (loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  });

  return null;
};

export default connect(mapState, mapDispatch)(AvailableRuns);
