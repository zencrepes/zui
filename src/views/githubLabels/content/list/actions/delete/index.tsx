import React from 'react';

import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { iRootState } from '../../../../../../store';
import ReposCheck from '../utils/repos/check';
import LabelsCheck from '../utils/labels/check';
import Content from './content';
import Actions from './actions';
import Title from '../utils/title';

const mapState = (state: iRootState) => ({
  openEditModal: state.githubLabels.openEditModal,
  editAction: state.githubLabels.editAction,
});

const mapDispatch = (dispatch: any) => ({
  setOpenEditModal: dispatch.githubLabels.setOpenEditModal,
  setLoading: dispatch.loading.setLoading,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const DeleteModal: React.FC<connectedProps> = (props: connectedProps) => {
  const { openEditModal, setOpenEditModal, editAction, setLoading } = props;

  if (editAction !== 'delete') {
    return null;
  }

  const handleClose = () => {
    setOpenEditModal(false);
  };

  return (
    <React.Fragment>
      {openEditModal && <ReposCheck />}
      {openEditModal && <LabelsCheck />}
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={openEditModal}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <Title setOpenEditModal={setOpenEditModal} setLoading={setLoading}>
          Bulk labels deletion
        </Title>
        <DialogContent>
          <Content />
        </DialogContent>
        <Actions />
      </Dialog>
    </React.Fragment>
  );
};
export default connect(mapState, mapDispatch)(DeleteModal);
