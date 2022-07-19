import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { iRootState } from '../../../../../../store';

const GQL_QUERY = loader('./getQueries.graphql');

const mapState = (state: iRootState) => ({
  selectedRunId: state.testingPerfs.selectedRunId,
});

const mapDispatch = (dispatch: any) => ({
  setLoading: dispatch.global.setLoading,
  setSelectedRunData: dispatch.testingPerfs.setSelectedRunData,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const SingleRunData: React.FC<connectedProps> = (props: connectedProps) => {
  const { selectedRunId, setSelectedRunData, setLoading } = props;

  const { data, loading } = useQuery(GQL_QUERY, {
    variables: {
      id: selectedRunId,
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data !== undefined) {
      setSelectedRunData(data.testingPerfs.data.item);
    }
    if (loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  });

  return null;
};

export default connect(mapState, mapDispatch)(SingleRunData);
