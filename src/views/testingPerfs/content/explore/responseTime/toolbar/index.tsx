import React from 'react';

import Grid from '@material-ui/core/Grid';

import SelectTransaction from './selectTransaction';
import SelectMetric from './selectMetric';
import InputMetric from './inputMetric';

interface Props {
  availableTransactions: string[];
  selectedTransaction: string;
  setTransaction: (value: string) => void;
  selectedMetricType: string;
  setMetricType: (value: string) => void;
  availableMetricType: any;
  selectedMetricValue: number;
  setMetricValue: (value: number) => void;
}

const Toolbar: React.FC<Props> = (props: Props) => {
  const {
    availableTransactions,
    selectedTransaction,
    setTransaction,
    selectedMetricType,
    setMetricType,
    availableMetricType,
    selectedMetricValue,
    setMetricValue,
  } = props;

  const selectedMetricTypeObj = availableMetricType.find((m: any) => m.value === selectedMetricType);

  return (
    <Grid container spacing={3} direction="row" justify="flex-end" alignItems="center">
      <Grid item>
        <SelectTransaction
          availableTransactions={availableTransactions}
          selectedTransaction={selectedTransaction}
          setTransaction={setTransaction}
        />
      </Grid>
      <Grid item>
        <SelectMetric
          availableMetricType={availableMetricType}
          setMetricType={setMetricType}
          selectedMetricType={selectedMetricTypeObj}
        />
      </Grid>
      <Grid item>
        <InputMetric
          selectedMetricType={selectedMetricTypeObj}
          selectedMetricValue={selectedMetricValue}
          setMetricValue={setMetricValue}
        />
      </Grid>
    </Grid>
  );
};

export default Toolbar;
