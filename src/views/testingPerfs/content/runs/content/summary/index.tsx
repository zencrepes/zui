import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { iRootState } from '../../../../../../store';

import Resources from './resources';
import Details from './details';
import Analysis from './analysis';
import Description from './description';
import EditRunModal from './editRunModal';

const mapState = (state: iRootState) => ({
  selectedRunData: state.testingPerfs.selectedRunData,
  selectedRunProfile: state.testingPerfs.selectedRunProfile,
});

const mapDispatch = (dispatch: any) => ({
  setSelectedRunData: dispatch.testingPerfs.setSelectedRunData,
  setSelectedRunProfile: dispatch.testingPerfs.setSelectedRunProfile,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Summary: React.FC<connectedProps> = (props: connectedProps) => {
  const { selectedRunData, setSelectedRunData, selectedRunProfile, setSelectedRunProfile } = props;

  useEffect(() => {
    if (
      selectedRunData !== undefined &&
      selectedRunData !== null &&
      Object.keys(selectedRunData).length > 0 &&
      selectedRunProfile === '' &&
      selectedRunData.runs.edges[0] !== undefined
    ) {
      setSelectedRunProfile(selectedRunData.runs.edges[0].node.name);
    }
  });

  if (selectedRunData === undefined || selectedRunData === null || Object.keys(selectedRunData).length === 0) {
    return null;
  }

  // Update the store state without reloading the data from the backend
  const updateRunField = (content: { field: string; value: any }[]) => {
    const newRunData = {
      ...selectedRunData,
    };
    for (const c of content) {
      newRunData[c.field] = c.value;
    }
    setSelectedRunData(newRunData);
  };

  return (
    <>
      <EditRunModal updateRunField={updateRunField} />
      <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
        <Grid item xs={6}>
          <Details run={selectedRunData} updateRunField={updateRunField} />
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'left' }}>
          <Analysis run={selectedRunData} />
        </Grid>
        <Grid item xs={6}>
          <Resources resources={selectedRunData.resources.edges} />
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'left' }}>
          <Description run={selectedRunData} />
        </Grid>
      </Grid>
    </>
  );
};

export default connect(mapState, mapDispatch)(Summary);
