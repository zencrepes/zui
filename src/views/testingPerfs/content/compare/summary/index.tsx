import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import CustomCard from '../../../../../components/customCard';
import { iRootState } from '../../../../../store';
import Runs from './runs/index';
import Resources from './resources';

const mapState = (state: iRootState) => ({
  compareData: state.testingPerfs.compareData,
  userName: state.global.userName,
});

const mapDispatch = (dispatch: any) => ({
  setCompareData: dispatch.testingPerfs.setCompareData,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Reference: React.FC<connectedProps> = (props: connectedProps) => {
  const { compareData, setCompareData } = props;

  if (
    Object.keys(compareData).length === 0 ||
    Object.keys(compareData.reference).length === 0 ||
    Object.keys(compareData.comparison).length === 0
  ) {
    return null;
  }

  // Update the store state without reloading the data from the backend
  const updateRunField = (id: string, field: string, value: any) => {
    const newReferenceDataset = {
      reference: {
        ...compareData.reference,
        runs: compareData.reference.runs.map((r: any) => {
          if (r.id === id) {
            const updatedDoc = { ...r };
            updatedDoc[field] = value;
            return updatedDoc;
          } else {
            return r;
          }
        }),
      },
      comparison: {
        ...compareData.comparison,
        runs: compareData.comparison.runs.map((r: any) => {
          if (r.id === id) {
            const updatedDoc = { ...r };
            updatedDoc[field] = value;
            return updatedDoc;
          } else {
            return r;
          }
        }),
      },
    };
    setCompareData(newReferenceDataset);
  };

  return (
    <Grid item xs={12}>
      <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
        <Grid item xs={6}>
          <Grid container spacing={1} justify="flex-start" alignItems="flex-start">
            <Grid item xs={12}>
              <CustomCard
                headerTitle="Reference runs"
                headerFactTitle="Included runs"
                headerFactValue={compareData.reference.runs.length}
              >
                <Runs dataset={compareData.reference} updateRunField={updateRunField} />
              </CustomCard>
            </Grid>
            <Grid item xs={12}>
              <CustomCard
                headerTitle="Reference resources"
                headerFactTitle="Included runs"
                headerFactValue={compareData.reference.runs.length}
              >
                <Resources dataset={compareData.reference} />
              </CustomCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1} justify="flex-start" alignItems="flex-start">
            <Grid item xs={12}>
              <CustomCard
                headerTitle="Comparing with runs"
                headerFactTitle="Included runs"
                headerFactValue={compareData.comparison.runs.length}
              >
                <Runs dataset={compareData.comparison} updateRunField={updateRunField} />
              </CustomCard>
            </Grid>
            <Grid item xs={12}>
              <CustomCard
                headerTitle="Comparing with resources"
                headerFactTitle="Included runs"
                headerFactValue={compareData.comparison.runs.length}
              >
                <Resources dataset={compareData.comparison} />
              </CustomCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connect(mapState, mapDispatch)(Reference);
