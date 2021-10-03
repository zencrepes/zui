import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {
  availableTransactions: string[];
  selectedTransaction: string;
  setTransaction: (value: string) => void;
}

const SelectTransaction: React.FC<Props> = (props: Props) => {
  const { selectedTransaction, setTransaction, availableTransactions } = props;

  const transactions = availableTransactions.map((t) => {
    return {
      display: t,
      value: t,
    };
  });
  return (
    <Autocomplete
      id="combo-box-field"
      options={transactions}
      getOptionLabel={(option) => option.display}
      value={transactions.find((v: any) => v.value === selectedTransaction)}
      style={{ width: 400 }}
      onChange={(event: any, newValue: any | null) => {
        if (newValue !== null) {
          setTransaction(newValue.value);
        }
      }}
      renderInput={(params) => <TextField {...params} label="Transaction" />}
    />
  );
};
export default SelectTransaction;
