import React from 'react';

import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { iRootState } from '../../../../../../store';
import Repos from '../utils/repos';
import Labels from '../utils/labels';
import Content from './content';
import Actions from './actions';
import Title from './title';

const mapState = (state: iRootState) => ({
  openEditModal: state.githubLabels.openEditModal,
  editAction: state.githubLabels.editAction,
});

const mapDispatch = (dispatch: any) => ({
  setOpenEditModal: dispatch.githubLabels.setOpenEditModal,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const DeleteModal: React.FC<connectedProps> = (props: connectedProps) => {
  const { openEditModal, setOpenEditModal, editAction } = props;

  if (editAction !== 'delete') {
    return null;
  }

  const handleClose = () => {
    setOpenEditModal(false);
  };

  return (
    <React.Fragment>
      {openEditModal && <Repos />}
      {openEditModal && <Labels />}
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={openEditModal}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <Title>Bulk labels deletion</Title>
        <DialogContent>
          <Content />
        </DialogContent>
        <Actions />
      </Dialog>
    </React.Fragment>
  );
};
export default connect(mapState, mapDispatch)(DeleteModal);
