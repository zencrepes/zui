import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { iRootState } from '../../../../../store';

const mapState = (state: iRootState) => ({
  compareAvailableQueries: state.testingPerfs.compareAvailableQueries,
  compareReferenceQuerySelected: state.testingPerfs.compareReferenceQuerySelected,
});

const mapDispatch = (dispatch: any) => ({
  setCompareReferenceQuerySelected: dispatch.testingPerfs.setCompareReferenceQuerySelected,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const SelectRun: React.FC<connectedProps> = (props: connectedProps) => {
  const { compareAvailableQueries, compareReferenceQuerySelected, setCompareReferenceQuerySelected } = props;

  useEffect(() => {
    if (Object.keys(compareReferenceQuerySelected).length === 0 && compareAvailableQueries.length > 0) {
      setCompareReferenceQuerySelected(compareAvailableQueries[0]);
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
      value={Object.keys(compareReferenceQuerySelected).length === 0 ? null : compareReferenceQuerySelected}
      style={{ width: 500 }}
      onChange={(event: any, newValue: any | null) => {
        if (newValue !== null) {
          setCompareReferenceQuerySelected(newValue);
        }
      }}
      renderInput={(params) => <TextField {...params} label="Select a reference dataset (single run or query)" />}
    />
  );
};
export default connect(mapState, mapDispatch)(SelectRun);
