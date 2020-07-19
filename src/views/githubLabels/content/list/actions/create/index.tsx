import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { iRootState } from '../../../../../../store';
import ReposCheck from '../utils/repos/check';
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
  setLabelNameRequired: dispatch.githubLabels.setLabelNameRequired,
  setLabelNameEnable: dispatch.githubLabels.setLabelNameEnable,
  setLabelColor: dispatch.githubLabels.setLabelColor,
  setLabelColorRequired: dispatch.githubLabels.setLabelColorRequired,
  setLabelColorEnable: dispatch.githubLabels.setLabelColorEnable,
});

const getRandomColor = () => {
  const letters = '0123456789abcdef';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const CreateModal: React.FC<connectedProps> = (props: connectedProps) => {
  const {
    openEditModal,
    setOpenEditModal,
    editAction,
    setLoading,
    setLabelNameRequired,
    setLabelNameEnable,
    setLabelColor,
    setLabelColorRequired,
    setLabelColorEnable,
  } = props;

  useEffect(() => {
    if (editAction === 'create') {
      // Since we're creating a label, its name is mandatory
      setLabelNameRequired(true);
      setLabelNameEnable(true);

      // The color is also mandatory, so generating a random one to be later modified by the user
      setLabelColorRequired(true);
      setLabelColorEnable(true);
      const randomColor = getRandomColor();
      setLabelColor(randomColor);
    }
  });

  if (editAction !== 'create') {
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
          Bulk labels creation
        </Title>
        <DialogContent>
          <Content />
        </DialogContent>
        <Actions />
      </Dialog>
    </React.Fragment>
  );
};
export default connect(mapState, mapDispatch)(CreateModal);
