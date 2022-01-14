import React from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';

import { iRootState } from '../../../store';

import Content from './content';

const mapState = (state: iRootState) => ({
  openEditRunModal: state.testingPerfs.openEditRunModal,
});

const mapDispatch = (dispatch: any) => ({
  setOpenEditRunModal: dispatch.testingPerfs.setOpenEditRunModal,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const EditRunModal: React.FC<connectedProps> = (props: connectedProps) => {
  const { openEditRunModal, setOpenEditRunModal } = props;

  const handleClose = () => {
    setOpenEditRunModal(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={false}
        maxWidth={'xl'}
        open={openEditRunModal}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <Content />
      </Dialog>
    </React.Fragment>
  );
};
export default connect(mapState, mapDispatch)(EditRunModal);
