import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { iRootState } from '../../../../../store';

const mapState = (state: iRootState) => ({
  compareAvailableProfiles: state.testingPerfs.compareAvailableProfiles,
  compareReferenceProfileSelected: state.testingPerfs.compareReferenceProfileSelected,
});

const mapDispatch = (dispatch: any) => ({
  setCompareReferenceProfileSelected: dispatch.testingPerfs.setCompareReferenceProfileSelected,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const SelectProfile: React.FC<connectedProps> = (props: connectedProps) => {
  const { compareAvailableProfiles, compareReferenceProfileSelected, setCompareReferenceProfileSelected } = props;

  useEffect(() => {
    if (compareReferenceProfileSelected === '' && compareAvailableProfiles.length > 0) {
      setCompareReferenceProfileSelected(compareAvailableProfiles[0]);
    }
    if (!compareAvailableProfiles.includes(compareReferenceProfileSelected)) {
      setCompareReferenceProfileSelected(compareAvailableProfiles[0]);
    }
  });

  if (compareAvailableProfiles.length === 0) {
    return null;
  }

  if (compareReferenceProfileSelected === '') {
    return null;
  }

  if (!compareAvailableProfiles.includes(compareReferenceProfileSelected)) {
    return null;
  }

  return (
    <Autocomplete
      id="combo-box-field"
      options={compareAvailableProfiles}
      getOptionLabel={(option) => option}
      value={compareReferenceProfileSelected.length === 0 ? null : compareReferenceProfileSelected}
      size="small"
      style={{ width: 450 }}
      onChange={(event: any, newValue: any | null) => {
        if (newValue !== null) {
          setCompareReferenceProfileSelected(newValue);
        }
      }}
      renderInput={(params) => <TextField {...params} label="Select a profile from the reference dataset" />}
    />
  );
};
export default connect(mapState, mapDispatch)(SelectProfile);
