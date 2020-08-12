import React from 'react';

import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { iRootState } from '../../../../../../store';
import ReposCheck from '../utils/repos/check';
import IssuesCheck from '../utils/issues/check';
import Content from './content';
import Actions from './actions';
import Title from '../utils/title';

const mapState = (state: iRootState) => ({
  openEditModal: state.githubIssues.openEditModal,
  editAction: state.githubIssues.editAction,
  fetchSelectedFromQuery: state.githubIssues.fetchSelectedFromQuery,
});

const mapDispatch = (dispatch: any) => ({
  setOpenEditModal: dispatch.githubIssues.setOpenEditModal,
  setLoading: dispatch.loading.setLoading,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const LabelModal: React.FC<connectedProps> = (props: connectedProps) => {
  const { openEditModal, setOpenEditModal, editAction, setLoading, fetchSelectedFromQuery } = props;

  if (editAction !== 'addlabel' && editAction !== 'removelabel') {
    return null;
  }

  let fetchIssues = false;
  if (openEditModal && fetchSelectedFromQuery === true) {
    fetchIssues = true;
  }
  const handleClose = () => {
    setOpenEditModal(false);
  };

  return (
    <React.Fragment>
      {openEditModal && <ReposCheck />}
      {fetchIssues && <IssuesCheck />}
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={openEditModal}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <Title setOpenEditModal={setOpenEditModal} setLoading={setLoading}>
          {editAction === 'addlabel' ? 'Add label to issue' : 'Remove from issue'}
        </Title>
        <DialogContent>
          <Content />
        </DialogContent>
        <Actions />
      </Dialog>
    </React.Fragment>
  );
};
export default connect(mapState, mapDispatch)(LabelModal);
