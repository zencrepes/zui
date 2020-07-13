import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

import { iRootState } from '../../../../../../../store';

const mapState = (state: iRootState) => ({
  verifiedLabels: state.githubLabels.verifiedLabels,
  updateLabelsSelected: state.githubLabels.updateLabelsSelected,
  updateCurrentStep: state.githubLabels.updateCurrentStep,
});

const mapDispatch = (dispatch: any) => ({
  setUpdateCurrentStep: dispatch.githubLabels.setUpdateCurrentStep,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const SubmitButton: React.FC<connectedProps> = (props: connectedProps) => {
  const { verifiedLabels, updateLabelsSelected } = props;

  const submitChanges = () => {
    console.log('Submit changes');
  };

  // For submit to be possible, there must be no errors in verifiedLabels and same number of elements between verifiedLabels and updateLabelsSelected
  if (
    verifiedLabels.find((l: any) => l.error === true) !== undefined ||
    verifiedLabels.length !== updateLabelsSelected.length
  ) {
    const errors = verifiedLabels.filter((l: any) => l.error === true);
    return (
      <Button variant="contained" color="primary" disabled>
        {errors.length > 0 ? 'Submit (' + errors.length + ' errors )' : 'Submit'}
      </Button>
    );
  }
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        submitChanges();
      }}
    >
      Submit
    </Button>
  );
};
export default connect(mapState, mapDispatch)(SubmitButton);
