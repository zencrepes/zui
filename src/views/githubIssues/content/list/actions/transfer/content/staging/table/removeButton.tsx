import React from 'react';
import { connect } from 'react-redux';

import DeleteIcon from '@material-ui/icons/Delete';

import IconButton from '@material-ui/core/IconButton';

import { iRootState } from '../../../../../../../../../store';

interface Props {
  issue: any;
}

const mapState = (state: iRootState) => ({
  verifiedIssues: state.githubIssues.verifiedIssues,
  updateIssuesSelected: state.githubIssues.updateIssuesSelected,
});

const mapDispatch = (dispatch: any) => ({
  setVerifiedIssues: dispatch.githubIssues.setVerifiedIssues,
  setUpdateIssuesSelected: dispatch.githubIssues.setUpdateIssuesSelected,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const RemoveButton: React.FC<connectedProps> = (props: connectedProps) => {
  const { verifiedIssues, issue, updateIssuesSelected, setVerifiedIssues, setUpdateIssuesSelected } = props;

  const deleteIssue = () => {
    setUpdateIssuesSelected(updateIssuesSelected.filter((l: any) => l.id !== issue.id));
    setVerifiedIssues(verifiedIssues.filter((l: any) => l.id !== issue.id));
  };

  return (
    <IconButton
      onClick={() => {
        deleteIssue();
      }}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};
export default connect(mapState, mapDispatch)(RemoveButton);
