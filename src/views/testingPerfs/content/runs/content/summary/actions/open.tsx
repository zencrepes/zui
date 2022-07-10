import React from 'react';
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { iRootState } from '../../../../../../../store';

interface Props {
  run: any;
}

const mapState = (state: iRootState) => ({
  query: state.testingPerfs.query,
});

const mapDispatch = (dispatch: any) => ({
  setSelectedTab: dispatch.testingPerfs.setSelectedTab,
  setAnalyzeSelectedRunId: dispatch.testingPerfs.setAnalyzeSelectedRunId,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const Open: React.FC<connectedProps> = (props: connectedProps) => {
  const { run, setSelectedTab, setAnalyzeSelectedRunId } = props;

  return (
    <Tooltip title={'Open the run in the analysis tab'}>
      <IconButton
        aria-label="Open run in analysis tab"
        size="small"
        color={'default'}
        onClick={() => {
          setAnalyzeSelectedRunId(run.id);
          setSelectedTab('analyze');
        }}
      >
        <VisibilityIcon />
      </IconButton>
    </Tooltip>
  );
};

export default connect(mapState, mapDispatch)(Open);
