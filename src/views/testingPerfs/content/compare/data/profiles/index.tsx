import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { iRootState } from '../../../../../../store';

const GQL_QUERY = loader('./getQueries.graphql');

const mapState = (state: iRootState) => ({
  query: state.testingPerfs.query,
  compareReferenceQuerySelected: state.testingPerfs.compareReferenceQuerySelected,
});

const mapDispatch = (dispatch: any) => ({
  setCompareAvailableProfiles: dispatch.testingPerfs.setCompareAvailableProfiles,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Profiles: React.FC<connectedProps> = (props: connectedProps) => {
  const { compareReferenceQuerySelected, setCompareAvailableProfiles, query } = props;

  const selectedQuery =
    Object.keys(compareReferenceQuerySelected).length === 0 ? query : compareReferenceQuerySelected.query;

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      query: JSON.stringify(selectedQuery),
    },
    fetchPolicy: 'network-only',
  });

  const profiles: string[] = [];
  if (data !== undefined) {
    for (const run of data.testingPerfs.data.items.nodes) {
      for (const profile of run.runs.edges) {
        if (!profiles.includes(profile.node.name)) {
          profiles.push(profile.node.name);
        }
      }
    }
  }

  useEffect(() => {
    if (data !== undefined) {
      setCompareAvailableProfiles(profiles.sort());
    }
  });

  return null;
};

export default connect(mapState, mapDispatch)(Profiles);
