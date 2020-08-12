import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { iRootState } from '../../../../../../../../store';

const gqlLabels = loader('./getIssues.graphql');

const mapState = (state: iRootState) => ({
  query: state.githubIssues.query,
});

const mapDispatch = (dispatch: any) => ({
  setOpenEditModal: dispatch.githubIssues.setOpenEditModal,
  setUpdateIssuesSelected: dispatch.githubIssues.setUpdateIssuesSelected,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const LabelsCheck: React.FC<connectedProps> = (props: connectedProps) => {
  const { query, setUpdateIssuesSelected } = props;

  let issuesSelected: any = [];

  const { data } = useQuery(gqlLabels, {
    variables: {
      query: JSON.stringify(query),
    },
    fetchPolicy: 'cache-and-network',
  });

  if (data !== undefined) {
    issuesSelected = data.issues.data.items.nodes;
  }
  useEffect(() => {
    setUpdateIssuesSelected(issuesSelected);
  });

  return null;
};
export default connect(mapState, mapDispatch)(LabelsCheck);
