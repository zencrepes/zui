import React from 'react';

import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

import { iRootState } from '../../../../../../../store';
import SubmitButton from './submitButton';

const mapState = (state: iRootState) => ({
  updateAddTeamSteps: state.githubMavenPoms.updateAddTeamSteps,
  updateCurrentStep: state.githubMavenPoms.updateCurrentStep,
  editDisableNext: state.githubMavenPoms.editDisableNext,
});

const mapDispatch = (dispatch: any) => ({
  setUpdateCurrentStep: dispatch.githubMavenPoms.setUpdateCurrentStep,
  setLoading: dispatch.loading.setLoading,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Actions: React.FC<connectedProps> = (props: connectedProps) => {
  const { updateAddTeamSteps, updateCurrentStep, setUpdateCurrentStep, setLoading, editDisableNext } = props;

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
      {updateCurrentStep === updateAddTeamSteps.length - 1 ? (
        <SubmitButton />
      ) : (
        <Button variant="contained" color="primary" onClick={handleNext} disabled={editDisableNext}>
          Next
        </Button>
      )}
    </DialogActions>
  );
};
export default connect(mapState, mapDispatch)(Actions);
