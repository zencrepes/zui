import React from 'react';
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { iRootState } from '../../../../store';

const mapState = (state: iRootState) => ({
  updateIssuesSelected: state.githubIssues.updateIssuesSelected,
});

const mapDispatch = (dispatch: any) => ({
  setUpdateIssuesSelected: dispatch.githubIssues.setUpdateIssuesSelected,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const SelectIssue: React.FC<connectedProps> = (props: connectedProps) => {
  const { updateIssuesSelected, setUpdateIssuesSelected } = props;

  if (updateIssuesSelected.length === 0) {
    return null;
  }
  return (
    <React.Fragment>
      <span>{updateIssuesSelected.length} selected </span>
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
    </React.Fragment>
  );
};

export default connect(mapState, mapDispatch)(SelectIssue);
