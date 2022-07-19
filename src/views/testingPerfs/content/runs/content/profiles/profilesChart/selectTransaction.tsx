import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {
  availableTransactions: string[];
  setSelectedTransaction: (value: string) => void;
  selectedTransaction: string;
}

const SelectTransaction: React.FC<Props> = (props: Props) => {
  const { availableTransactions, setSelectedTransaction, selectedTransaction } = props;

  return (
    <Autocomplete
      id="combo-box-field"
      options={availableTransactions}
      value={selectedTransaction}
      style={{ width: 300 }}
      onChange={(event: any, newValue: any | null) => {
        if (newValue !== null) {
          setSelectedTransaction(newValue);
        }
      }}
      renderInput={(params) => <TextField {...params} label="Select a transaction" />}
    />
  );
};
export default SelectTransaction;
