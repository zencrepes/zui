import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { iRootState } from '../../../../../../store';

const GQL_QUERY = loader('./getQueries.graphql');

const mapState = (state: iRootState) => ({
  query: state.testingPerfs.query,
  selectedRunProfile: state.testingPerfs.selectedRunProfile,
});

const mapDispatch = (dispatch: any) => ({
  setRuns: dispatch.testingPerfs.setRuns,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Profiles: React.FC<connectedProps> = (props: connectedProps) => {
  const { setRuns, query, selectedRunProfile } = props;

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      query: JSON.stringify(query),
      transactions: ['*'],
      profileName: selectedRunProfile,
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data !== undefined) {
      const runs = data.testingPerfs.data.items.nodes
        .slice()
        .sort((a: any, b: any) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime());
      setRuns(runs);
    }
  });

  return null;
};

export default connect(mapState, mapDispatch)(Profiles);
