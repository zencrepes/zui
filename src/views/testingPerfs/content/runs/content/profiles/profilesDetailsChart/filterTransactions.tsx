import React from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
  availableTransactions: any;
  setFilteredTransactions: (value: string) => void;
  filteredTransactions: string;
}

const FilterTransactions: React.FC<Props> = (props: Props) => {
  const { availableTransactions, filteredTransactions, setFilteredTransactions } = props;

  const currentTransactionsCount = availableTransactions
    .filter((t: string) => t.includes(filteredTransactions))
    .slice(0, 20).length;
  const totalTransactionsCount = availableTransactions.length;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredTransactions(event.target.value);
  };

  return (
    <TextField
      id="standard-basic"
      label={'Displaying ' + currentTransactionsCount + ' out of ' + totalTransactionsCount + ' transactions'}
      value={filteredTransactions}
      onChange={handleChange}
      style={{ width: 300 }}
    />
  );
};
export default FilterTransactions;
