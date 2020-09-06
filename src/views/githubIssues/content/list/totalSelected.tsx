import React from 'react';
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import Tooltip from '@material-ui/core/Tooltip';

import { iRootState } from '../../../../store';

const mapState = (state: iRootState) => ({
  updateIssuesSelected: state.githubIssues.updateIssuesSelected,
});

const mapDispatch = (dispatch: any) => ({
  setUpdateIssuesSelected: dispatch.githubIssues.setUpdateIssuesSelected,
  setSelectedTab: dispatch.githubIssues.setSelectedTab,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const SelectIssue: React.FC<connectedProps> = (props: connectedProps) => {
  const { updateIssuesSelected, setUpdateIssuesSelected, setSelectedTab } = props;

  const openNetwork = () => {
    setSelectedTab('network');
  };

  if (updateIssuesSelected.length === 0) {
    return null;
  }
  return (
    <React.Fragment>
      <IconButton
        aria-label="delete"
        size="small"
        color="primary"
        onClick={() => {
          setUpdateIssuesSelected([]);
        }}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
      <span>{updateIssuesSelected.length} selected </span>
      <Tooltip title={'Build network from selected issues'}>
        <IconButton aria-label="Open Network" size="small" color="primary" onClick={openNetwork}>
          <BubbleChartIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
};

export default connect(mapState, mapDispatch)(SelectIssue);
