import React from 'react';

import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

import { iRootState } from '../../../../../../../store';
import SubmitButton from './submitButton';

const mapState = (state: iRootState) => ({
  updateDeleteSteps: state.githubLabels.updateDeleteSteps,
  updateCurrentStep: state.githubLabels.updateCurrentStep,
});

const mapDispatch = (dispatch: any) => ({
  setUpdateCurrentStep: dispatch.githubLabels.setUpdateCurrentStep,
  setLoading: dispatch.loading.setLoading,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Actions: React.FC<connectedProps> = (props: connectedProps) => {
  const { updateDeleteSteps, updateCurrentStep, setUpdateCurrentStep, setLoading } = props;

  const handleBack = () => {
    setUpdateCurrentStep(updateCurrentStep - 1);
    setLoading(false);
  };

  const handleNext = () => {
    setUpdateCurrentStep(updateCurrentStep + 1);
  };

  return (
    <DialogActions>
      <Button disabled={updateCurrentStep === 0} onClick={handleBack}>
        Back
      </Button>
      {updateCurrentStep === updateDeleteSteps.length - 1 ? (
        <SubmitButton />
      ) : (
        <Button variant="contained" color="primary" onClick={handleNext}>
          Next
        </Button>
      )}
    </DialogActions>
  );
};
export default connect(mapState, mapDispatch)(Actions);
