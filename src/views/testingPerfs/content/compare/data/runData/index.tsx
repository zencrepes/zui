import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { iRootState } from '../../../../../../store';

const GQL_QUERY = loader('./getQueries.graphql');

const mapState = (state: iRootState) => ({
  selectedRun: state.testingPerfs.selectedRun,
});

const mapDispatch = (dispatch: any) => ({
  setSelectedRunData: dispatch.testingPerfs.setSelectedRunData,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const RunData: React.FC<connectedProps> = (props: connectedProps) => {
  const { selectedRun, setSelectedRunData } = props;

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      id: selectedRun.id,
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data !== undefined) {
      console.log(data.testingPerfs.data.item);
      setSelectedRunData(data.testingPerfs.data.item);
    }
  });

  return null;
};

export default connect(mapState, mapDispatch)(RunData);
