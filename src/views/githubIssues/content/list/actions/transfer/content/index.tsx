import React from 'react';
import { connect } from 'react-redux';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { iRootState } from '../../../../../../../store';

import Intro from './intro';
import Repos from './repos';
import Staging from './staging';

const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <Intro />;
    case 1:
      return <Repos />;
    case 2:
      return <Staging />;
  }
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
  }),
);

const mapState = (state: iRootState) => ({
  updateTransferSteps: state.githubIssues.updateTransferSteps,
  updateCurrentStep: state.githubIssues.updateCurrentStep,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Content: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { updateTransferSteps, updateCurrentStep } = props;

  return (
    <div className={classes.root}>
      <Stepper activeStep={updateCurrentStep}>
        {updateTransferSteps.map((label: string) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>{getStepContent(updateCurrentStep)}</div>
    </div>
  );
};
export default connect(mapState, mapDispatch)(Content);
