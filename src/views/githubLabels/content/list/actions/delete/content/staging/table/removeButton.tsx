import React from 'react';
import { connect } from 'react-redux';

import DeleteIcon from '@material-ui/icons/Delete';

import IconButton from '@material-ui/core/IconButton';

import { iRootState } from '../../../../../../../../../store';

interface Props {
  label: any;
}

const mapState = (state: iRootState) => ({
  verifiedLabels: state.githubLabels.verifiedLabels,
  updateLabelsSelected: state.githubLabels.updateLabelsSelected,
});

const mapDispatch = (dispatch: any) => ({
  setVerifiedLabels: dispatch.githubLabels.setVerifiedLabels,
  setUpdateLabelsSelected: dispatch.githubLabels.setUpdateLabelsSelected,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const RemoveButton: React.FC<connectedProps> = (props: connectedProps) => {
  const { verifiedLabels, label, updateLabelsSelected, setVerifiedLabels, setUpdateLabelsSelected } = props;

  const deleteLabel = () => {
    setUpdateLabelsSelected(updateLabelsSelected.filter((l: any) => l.id !== label.id));
    setVerifiedLabels(verifiedLabels.filter((l: any) => l.id !== label.id));
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
