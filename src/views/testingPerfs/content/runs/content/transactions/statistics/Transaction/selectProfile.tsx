import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {
  availableProfiles: string[];
  setSelectedRunProfile: (value: string) => void;
  selectedProfile: string;
}

const SelectProfile: React.FC<Props> = (props: Props) => {
  const { availableProfiles, setSelectedRunProfile, selectedProfile } = props;

  return (
    <Autocomplete
      id="combo-box-field"
      options={availableProfiles}
      value={selectedProfile}
      style={{ width: 300 }}
      onChange={(event: any, newValue: any | null) => {
        if (newValue !== null) {
          setSelectedRunProfile(newValue);
        }
      }}
      renderInput={(params) => <TextField {...params} label="Select a profile" />}
    />
  );
};
export default SelectProfile;
