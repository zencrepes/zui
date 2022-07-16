import React from 'react';
import Grid from '@material-ui/core/Grid';

import CustomCard from '../../../../../../../components/customCard';

import HistoryLineDual from './historyLineDual';
import SelectMetric from './selectMetric';

import randomColor from 'randomcolor';
import FilterTransactions from './filterTransactions';

interface Run {
  id: string;
  name: string;
  startedAt: string;
  runs: any;
}

interface Props {
  run: Run;
}

const ProfilesDetailsChart: React.FC<Props> = (props: Props) => {
  const [selectedMetric, setSelectedMetric] = React.useState<string>('meanResTime');
  const [filteredTransactions, setFilteredTransactions] = React.useState<string>('');
  const { run } = props;

  // Get list of available transactions from the first run
  const availableMetrics = [
    { value: 'errorCount', name: 'Error Count' },
    { value: 'meanResTime', name: 'Mean response time' },
    { value: 'pct1ResTime', name: '90%ile response time' },
    { value: 'pct2ResTime', name: '95%ile response time' },
    { value: 'pct3ResTime', name: '99%ile response time' },
    { value: 'throughput', name: 'Throughput' },
  ];

  const availableTransactions = run.runs.edges[0].node.statistics
    .reduce((acc: string[], s: any) => {
      if (!acc.includes(s.transaction)) {
        acc.push(s.transaction);
      }
      return acc;
    }, [])
    .sort();

  const chartData = {
    datasets: availableTransactions
      .filter((t: string) => t.includes(filteredTransactions))
      .slice(0, 20)
      .map((t: string) => {
        const color = randomColor({
          luminosity: 'light',
          format: 'rgb', // e.g. 'rgb(225,200,20)'
          seed: t,
        });
        return {
          type: 'line',
          label: t,
          data: run.runs.edges.map((r: any) =>
            Math.round(r.node.statistics.find((s: any) => s.transaction === t)[selectedMetric]),
          ),
          backgroundColor: color,
          borderColor: color,
          fill: false,
        };
      }),
    labels: run.runs.edges.map((run: any) => run.node.name),
  };

  return (
    <CustomCard
      headerTitle="Detailed metrics per transaction"
      headerFactTitle={
        <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
          <Grid item xs={6}>
            <SelectMetric
              availableMetrics={availableMetrics}
              selectedMetric={selectedMetric}
              setSelectedMetric={setSelectedMetric}
            />
          </Grid>
          <Grid item xs={6}>
            <FilterTransactions
              availableTransactions={availableTransactions}
              filteredTransactions={filteredTransactions}
              setFilteredTransactions={setFilteredTransactions}
            />
          </Grid>
        </Grid>
      }
      headerFactValue=""
    >
      <HistoryLineDual chartData={chartData} dataset={[]} />
    </CustomCard>
  );
};
export default ProfilesDetailsChart;
