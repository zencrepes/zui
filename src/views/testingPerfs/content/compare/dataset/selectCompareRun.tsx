import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { iRootState } from '../../../../../store';

const mapState = (state: iRootState) => ({
  compareAvailableQueries: state.testingPerfs.compareAvailableQueries,
  compareComparisonQuerySelected: state.testingPerfs.compareComparisonQuerySelected,
});

const mapDispatch = (dispatch: any) => ({
  setCompareComparisonQuerySelected: dispatch.testingPerfs.setCompareComparisonQuerySelected,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const SelectCompareRun: React.FC<connectedProps> = (props: connectedProps) => {
  const { compareAvailableQueries, compareComparisonQuerySelected, setCompareComparisonQuerySelected } = props;

  useEffect(() => {
    if (compareComparisonQuerySelected !== undefined && Object.keys(compareComparisonQuerySelected).length === 0) {
      if (compareAvailableQueries.length > 1) {
        setCompareComparisonQuerySelected(compareAvailableQueries[1]);
      } else {
        setCompareComparisonQuerySelected(compareAvailableQueries[0]);
      }
    }

    // If the selected query is not present in the list of available queries, we default to the first query in the array
    if (
      compareAvailableQueries.length > 0 &&
      compareComparisonQuerySelected !== undefined &&
      Object.keys(compareComparisonQuerySelected).length > 0 &&
      compareAvailableQueries.find((q: any) => q.name === compareComparisonQuerySelected.name) === undefined
    ) {
      setCompareComparisonQuerySelected(compareAvailableQueries[0]);
    }
  });

  if (compareAvailableQueries.length === 0) {
    return null;
  }

  return (
    <Autocomplete
      id="combo-box-field"
      options={compareAvailableQueries}
      getOptionLabel={(option) => option.name}
      value={
        Object.keys(compareComparisonQuerySelected === undefined || compareComparisonQuerySelected).length === 0
          ? null
          : compareComparisonQuerySelected
      }
      size="small"
      style={{ width: 450 }}
      onChange={(event: any, newValue: any | null) => {
        if (newValue !== null) {
          setCompareComparisonQuerySelected(newValue);
        }
      }}
      renderInput={(params) => <TextField {...params} label="Select a dataset to compare with (single run or query)" />}
    />
  );
};
export default connect(mapState, mapDispatch)(SelectCompareRun);
