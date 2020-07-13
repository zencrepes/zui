import React from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { iRootState } from '../../../../../../../store';

import Color from './color';
import Text from './text';

const mapState = (state: iRootState) => ({
  labelColor: state.githubLabels.labelColor,
  labelColorEnable: state.githubLabels.labelColorEnable,
  labelName: state.githubLabels.labelName,
  labelNameEnable: state.githubLabels.labelNameEnable,
  labelDescription: state.githubLabels.labelDescription,
  labelDescriptionEnable: state.githubLabels.labelDescriptionEnable,
});

const mapDispatch = (dispatch: any) => ({
  setLabelColor: dispatch.githubLabels.setLabelColor,
  setLabelColorEnable: dispatch.githubLabels.setLabelColorEnable,
  setLabelName: dispatch.githubLabels.setLabelName,
  setLabelNameEnable: dispatch.githubLabels.setLabelNameEnable,
  setLabelDescription: dispatch.githubLabels.setLabelDescription,
  setLabelDescriptionEnable: dispatch.githubLabels.setLabelDescriptionEnable,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Form: React.FC<connectedProps> = (props: connectedProps) => {
  const {
    labelColor,
    labelColorEnable,
    setLabelColor,
    setLabelColorEnable,
    labelName,
    setLabelName,
    labelNameEnable,
    setLabelNameEnable,
    labelDescription,
    setLabelDescription,
    labelDescriptionEnable,
    setLabelDescriptionEnable,
  } = props;

  return (
    <React.Fragment>
      <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
        <Grid item xs={6}>
          <Paper>
            <Typography variant="h5" gutterBottom>
              Input
            </Typography>
            <Text
              label={'Label Name'}
              placeholder={''}
              textContent={labelName}
              setTextContent={setLabelName}
              textContentEnable={labelNameEnable}
              setTextContentEnable={setLabelNameEnable}
            />
            <Color
              labelColor={labelColor}
              labelColorEnable={labelColorEnable}
              setLabelColor={setLabelColor}
              setLabelColorEnable={setLabelColorEnable}
            />
            <Text
              label={'Description'}
              placeholder={'This field is optional'}
              textContent={labelDescription}
              setTextContent={setLabelDescription}
              textContentEnable={labelDescriptionEnable}
              setTextContentEnable={setLabelDescriptionEnable}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Typography variant="h5" gutterBottom>
              Repositories
            </Typography>
            <Text
              label={'Label Name'}
              placeholder={''}
              textContent={labelName}
              setTextContent={setLabelName}
              textContentEnable={labelNameEnable}
              setTextContentEnable={setLabelNameEnable}
            />
            <Color
              labelColor={labelColor}
              labelColorEnable={labelColorEnable}
              setLabelColor={setLabelColor}
              setLabelColorEnable={setLabelColorEnable}
            />
            <Text
              label={'Description'}
              placeholder={'This field is optional'}
              textContent={labelDescription}
              setTextContent={setLabelDescription}
              textContentEnable={labelDescriptionEnable}
              setTextContentEnable={setLabelDescriptionEnable}
            />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default connect(mapState, mapDispatch)(Form);
