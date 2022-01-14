import React from 'react';
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';

import { iRootState } from '../../../../../../../store';

interface Props {
  run: any;
}

const mapState = (state: iRootState) => ({
  query: state.testingPerfs.query,
});

const mapDispatch = (dispatch: any) => ({
  setOpenEditRunModal: dispatch.testingPerfs.setOpenEditRunModal,
  setOpenEditRunId: dispatch.testingPerfs.setOpenEditRunId,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const DatasetView: React.FC<connectedProps> = (props: connectedProps) => {
  const { run, setOpenEditRunModal, setOpenEditRunId } = props;

  return (
    <Tooltip title={'Edit the run metadata (description, analysis)'}>
      <IconButton
        aria-label="Edit run metadata"
        size="small"
        color={'default'}
        onClick={() => {
          setOpenEditRunId(run.id);
          setOpenEditRunModal(true);
        }}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default connect(mapState, mapDispatch)(DatasetView);
