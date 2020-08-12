import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import Alert from '@material-ui/lab/Alert';

import { iRootState } from '../../../../../../../../store';

const GQL_QUERY = loader('./checkPermission.graphql');

const mapState = (state: iRootState) => ({
  updateTransferSelectedRepoId: state.githubIssues.updateTransferSelectedRepoId,
});

const mapDispatch = (dispatch: any) => ({
  setUpdateTransferSelectedRepoViewerPermission: dispatch.githubIssues.setUpdateTransferSelectedRepoViewerPermission,
  setEditDisableNext: dispatch.githubIssues.setEditDisableNext,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const CheckPermission: React.FC<connectedProps> = (props: connectedProps) => {
  const { updateTransferSelectedRepoId, setUpdateTransferSelectedRepoViewerPermission, setEditDisableNext } = props;

  const { data } = useQuery(GQL_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      repoId: updateTransferSelectedRepoId,
    },
  });

  useEffect(() => {
    if (updateTransferSelectedRepoId === '') {
      setEditDisableNext(true);
    } else {
      if (data !== undefined) {
        setUpdateTransferSelectedRepoViewerPermission(data.node.viewerPermission);
      }
      if (data !== undefined && ['ADMIN', 'MAINTAIN', 'WRITE', 'TRIAGE'].includes(data.node.viewerPermission)) {
        setEditDisableNext(false);
      } else {
        setEditDisableNext(true);
      }
    }
  });

  if (data === undefined || updateTransferSelectedRepoId === '') {
    return null;
  }
  if (['ADMIN', 'MAINTAIN', 'WRITE', 'TRIAGE'].includes(data.node.viewerPermission)) {
    return (
      <Alert severity="success">
        You have the correct repository permission for this operation ({data.node.viewerPermission})
      </Alert>
    );
  }
  return (
    <Alert severity="error">
      You do not have the correct repository permission for this operation ({data.node.viewerPermission})
    </Alert>
  );
};

export default connect(mapState, mapDispatch)(CheckPermission);
