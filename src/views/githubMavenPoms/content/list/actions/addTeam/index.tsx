import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { iRootState } from '../../../../../../store';
import ReposCheck from './content/repos/check';
import Content from './content';
import Actions from './actions';
import Title from '../utils/title';

const mapState = (state: iRootState) => ({
  openEditModal: state.githubMavenPoms.openEditModal,
  editAction: state.githubMavenPoms.editAction,
});

const mapDispatch = (dispatch: any) => ({
  setOpenEditModal: dispatch.githubMavenPoms.setOpenEditModal,
  setUpdateTeamSlug: dispatch.githubMavenPoms.setUpdateTeamSlug,
  setUpdateTeamPermission: dispatch.githubMavenPoms.setUpdateTeamPermission,
  setLoading: dispatch.loading.setLoading,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const AddTeamModal: React.FC<connectedProps> = (props: connectedProps) => {
  const { openEditModal, setOpenEditModal, editAction, setLoading, setUpdateTeamSlug, setUpdateTeamPermission } = props;

  useEffect(() => {
    setUpdateTeamSlug('');
    setUpdateTeamPermission('read');
  });

  if (editAction !== 'add-team') {
    return null;
  }

  const handleClose = () => {
    setOpenEditModal(false);
  };

  return (
    <React.Fragment>
      {openEditModal && <ReposCheck />}
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={openEditModal}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <Title setOpenEditModal={setOpenEditModal} setLoading={setLoading}>
          Grant Repositories permissions to a team
        </Title>
        <DialogContent>
          <Content />
        </DialogContent>
        <Actions />
      </Dialog>
    </React.Fragment>
  );
};
export default connect(mapState, mapDispatch)(AddTeamModal);
