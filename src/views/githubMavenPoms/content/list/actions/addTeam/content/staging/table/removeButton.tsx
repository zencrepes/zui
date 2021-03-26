import React from 'react';
import { connect } from 'react-redux';

import DeleteIcon from '@material-ui/icons/Delete';

import IconButton from '@material-ui/core/IconButton';

import { iRootState } from '../../../../../../../../../store';

interface Props {
  label: any;
}

const mapState = (state: iRootState) => ({
  verifiedRepos: state.githubMavenPoms.verifiedRepos,
  updateReposSelected: state.githubMavenPoms.updateReposSelected,
});

const mapDispatch = (dispatch: any) => ({
  setVerifiedLabels: dispatch.githubMavenPoms.setVerifiedLabels,
  setUpdateLabelsSelected: dispatch.githubMavenPoms.setUpdateLabelsSelected,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const RemoveButton: React.FC<connectedProps> = (props: connectedProps) => {
  const { verifiedRepos, label, updateReposSelected, setVerifiedLabels, setUpdateLabelsSelected } = props;

  const deleteLabel = () => {
    setUpdateLabelsSelected(updateReposSelected.filter((l: any) => l.id !== label.id));
    setVerifiedLabels(verifiedRepos.filter((l: any) => l.id !== label.id));
  };

  return (
    <IconButton
      aria-label="Delete"
      onClick={() => {
        deleteLabel();
      }}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};
export default connect(mapState, mapDispatch)(RemoveButton);
