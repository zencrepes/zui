import React from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';

import { iRootState } from '../../../../../../../store';

import Content from './content';

const mapState = (state: iRootState) => ({
  openEditRunModal: state.testingPerfs.openEditRunModal,
});

const mapDispatch = (dispatch: any) => ({
  setOpenEditRunModal: dispatch.testingPerfs.setOpenEditRunModal,
});

interface Props {
  updateRunField: (field: string, value: any) => void;
}

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const EditRunModal: React.FC<connectedProps> = (props: connectedProps) => {
  const { openEditRunModal, setOpenEditRunModal, updateRunField } = props;

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
        <Content updateRunField={updateRunField} />
      </Dialog>
    </React.Fragment>
  );
};
export default connect(mapState, mapDispatch)(EditRunModal);
