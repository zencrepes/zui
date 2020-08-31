import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import { iRootState } from '../../../../../store';

const useStyles = makeStyles(() => ({
  root: {
    width: 200,
  },
  slider: {
    padding: '22px 0px',
  },
}));

const mapState = (state: iRootState) => ({
  networkDistanceGraph: state.githubIssues.networkDistanceGraph,
  networkDistanceGraphCeiling: state.githubIssues.networkDistanceGraphCeiling,
  networkUpdating: state.githubIssues.networkUpdating,
});

const mapDispatch = (dispatch: any) => ({
  updateNetworkDistance: dispatch.githubIssues.updateNetworkDistance,
  setNetworkDistanceGraph: dispatch.githubIssues.setNetworkDistanceGraph,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const DistanceSlider: React.FC<connectedProps> = (props: connectedProps) => {
  const {
    networkDistanceGraph,
    networkDistanceGraphCeiling,
    updateNetworkDistance,
    networkUpdating,
    setNetworkDistanceGraph,
  } = props;
  const classes = useStyles();

  const handleChange = (event: any, newValue: number | number[]) => {
    updateNetworkDistance(newValue as number);
  };

  if (networkDistanceGraph > networkDistanceGraphCeiling) {
    setNetworkDistanceGraph(networkDistanceGraphCeiling);
  }

  return (
    <div className={classes.root}>
      <Typography id="label">
        Distance: {networkDistanceGraph}, max: {networkDistanceGraphCeiling}
      </Typography>
      <Slider
        value={networkDistanceGraph}
        min={0}
        max={networkDistanceGraphCeiling}
        step={1}
        disabled={networkUpdating}
        onChange={handleChange}
      />
    </div>
  );
};

export default connect(mapState, mapDispatch)(DistanceSlider);
