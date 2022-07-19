import React from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';

import { useMutation } from '@apollo/client';

import Button from '@material-ui/core/Button';

import { iRootState } from '../../../../../../../store';

const GQL_UPDATE_RUN = loader('./updateRun.graphql');

const mapState = (state: iRootState) => ({
  openEditRun: state.testingPerfs.openEditRun,
  openEditRunOnSuccess: state.testingPerfs.openEditRunOnSuccess,
  openEditRunOnCancel: state.testingPerfs.openEditRunOnCancel,
  openEditRunOnFailure: state.testingPerfs.openEditRunOnFailure,
  username: state.global.userName,
});

const mapDispatch = (dispatch: any) => ({
  setOpenEditRunModal: dispatch.testingPerfs.setOpenEditRunModal,
});

interface Props {
  sourceRun: any;
  updateRunField: (content: { field: string; value: any }[]) => void;
}

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const ApplyButton: React.FC<connectedProps> = (props: connectedProps) => {
  const {
    openEditRun,
    setOpenEditRunModal,
    sourceRun,
    username,
    openEditRunOnSuccess,
    openEditRunOnFailure,
    updateRunField,
  } = props;

  const [updateRun, { loading, error }] = useMutation(GQL_UPDATE_RUN);

  if (error) {
    openEditRunOnFailure();
  }

  const applyChanges = () => {
    updateRun({
      variables: {
        id: openEditRun.id,
        username: username,
        group: openEditRun.group,
        description: openEditRun.description,
        analysis: openEditRun.analysis,
      },
      update() {
        updateRunField([
          { field: 'group', value: openEditRun.group },
          { field: 'analysis', value: openEditRun.analysis },
          { field: 'description', value: openEditRun.description },
        ]);
        setOpenEditRunModal(false);
        openEditRunOnSuccess();
      },
    });
  };

  let contentUnmodified = true;
  if (
    openEditRun.description !== sourceRun.description ||
    openEditRun.analysis !== sourceRun.analysis ||
    openEditRun.group !== sourceRun.group
  ) {
    contentUnmodified = false;
  }

  if (openEditRun.analysis !== undefined) {
    if (loading) {
      return (
        <Button variant="contained" color="primary" disabled>
          Applying Changes...
        </Button>
      );
    } else {
      return (
        <Button onClick={applyChanges} variant="contained" color="primary" disabled={contentUnmodified}>
          Apply Changes
        </Button>
      );
    }
  }

  return null;
};
export default connect(mapState, mapDispatch)(ApplyButton);
