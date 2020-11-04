import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { iRootState } from '../../../../../../../../store';

const gqlLabels = loader('./getLabels.graphql');

const mapState = (state: iRootState) => ({
  query: state.githubLabels.query,
});

const mapDispatch = (dispatch: any) => ({
  setOpenEditModal: dispatch.githubLabels.setOpenEditModal,
  setUpdateLabelsAvailable: dispatch.githubLabels.setUpdateLabelsAvailable,
  setUpdateLabelsSelected: dispatch.githubLabels.setUpdateLabelsSelected,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const LabelsCheck: React.FC<connectedProps> = (props: connectedProps) => {
  const { query, setUpdateLabelsSelected, setUpdateLabelsAvailable } = props;

  let labelsAvailable: any = [];
  let labelsSelected: any = [];

  const { data } = useQuery(gqlLabels, {
    variables: {
      query: JSON.stringify(query),
    },
    fetchPolicy: 'network-only',
  });

  if (data !== undefined) {
    labelsAvailable = data.labels.data.items.nodes;
    labelsSelected = data.labels.data.items.nodes;
  }
  useEffect(() => {
    setUpdateLabelsAvailable(labelsAvailable);
    setUpdateLabelsSelected(labelsSelected);
  });

  return null;
};
export default connect(mapState, mapDispatch)(LabelsCheck);
