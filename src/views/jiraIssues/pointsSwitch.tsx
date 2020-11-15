import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Switch from '@material-ui/core/Switch';

import { iRootState } from '../../store';

const mapState = (state: iRootState) => ({
  defaultPoints: state.jiraIssues.defaultPoints,
});

const mapDispatch = (dispatch: any) => ({
  setDefaultPoints: dispatch.jiraIssues.setDefaultPoints,
});

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'right',
  },
}));

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const PointsSwitch: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { defaultPoints, setDefaultPoints } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultPoints(event.target.checked);
  };

  return (
    <div className={classes.root}>
      Issues Count
      <Switch checked={defaultPoints} onChange={handleChange} value="defaultPoints" />
      Points
    </div>
  );
};

export default connect(mapState, mapDispatch)(PointsSwitch);
