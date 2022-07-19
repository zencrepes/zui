import React from 'react';

import CustomCard from '../../../../../../../../components/customCard';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import HelpIcon from '@material-ui/icons/Help';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

import TransactionChart from './transactionChart';
import SelectProfile from './selectProfile';

interface Props {
  transaction: any;
  selectedRun: any;
  transactionMetrics: any;
  selectedRunProfile: string;
  availableProfiles: string[];
  setSelectedRunProfile: (value: string) => void;
}

const getTrend = (metric: any, transaction: any, selectedRun: any, compareType: string) => {
  const selectedTransactionIdx = transaction.runs.findIndex((t: any) => t.run.id === selectedRun.id);
  let currentValue = 0;
  let compareToValue = 0;

  //Only compare if there are 5 runs in the dataset
  if (transaction.runs.length < 5) {
    return <TableCell key={metric.id} align="center"></TableCell>;
  }

  if (compareType === 'run') {
    currentValue = transaction.runs[selectedTransactionIdx].statistics[metric.id];
    compareToValue = transaction.runs[selectedTransactionIdx].velocityStatistics[metric.id];
  } else {
    currentValue = transaction.runs[selectedTransactionIdx].velocityStatistics[metric.id];
    compareToValue = transaction.runs[selectedTransactionIdx - 5].velocityStatistics[metric.id];
  }

  let pct = 0;

  if (compareToValue > 0 && currentValue > 0) {
    pct = Math.round((100 - (compareToValue / currentValue) * 100) * 10) / 10;
  }

  if (pct > -5 && pct < 5) {
    return (
      <TableCell key={metric.id} align="center">
        <TrendingFlatIcon fontSize="small" /> {pct}%
      </TableCell>
    );
  }
  if (pct < -5) {
    return (
      <TableCell key={metric.id} align="center">
        <TrendingDownIcon fontSize="small" /> {pct}%
      </TableCell>
    );
  }
  return (
    <TableCell key={metric.id} align="center">
      <TrendingUpIcon fontSize="small" /> {pct}%
    </TableCell>
  );
};

const Transaction: React.FC<Props> = (props: Props) => {
  const {
    transaction,
    selectedRun,
    transactionMetrics,
    selectedRunProfile,
    availableProfiles,
    setSelectedRunProfile,
  } = props;

  // Append velocity data to the transaction
  const velocityWindow = 3;
  const updatedTransaction = {
    ...transaction,
    runs: transaction.runs.map((r: any, idx: number) => {
      const sliceStart = idx - velocityWindow + 1 <= 0 ? 0 : idx - velocityWindow + 1;
      const selectedRuns = transaction.runs.slice(sliceStart, idx + 1);
      const velocity: any = {};
      for (const m of transactionMetrics) {
        const avg =
          selectedRuns.map((r: any) => r.statistics[m.id]).reduce((a: any, b: any) => a + b, 0) / selectedRuns.length;
        velocity[m.id] = avg;
      }
      return {
        ...r,
        velocityStatistics: velocity,
      };
    }),
  };

  // This run get a grey circle in the chart
  const selectedTransactionRun = updatedTransaction.runs.find((t: any) => t.run.id === selectedRun.id);

  if (selectedTransactionRun === undefined) {
    console.log(
      `Unable to display transaction: ${transaction.name}, the selected run: ${selectedRun.id} is missing from the list of runs in for that transaction: `,
      updatedTransaction,
    );
    return <> </>;
  }

  return (
    <CustomCard
      headerTitle={transaction.name}
      headerFactTitle={
        <SelectProfile
          availableProfiles={availableProfiles}
          selectedProfile={selectedRunProfile}
          setSelectedRunProfile={setSelectedRunProfile}
        />
      }
      headerFactValue=""
    >
      <TableContainer>
        <Table aria-label="Metrics" size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              {transactionMetrics.map((t: any) => (
                <TableCell key={t.id}>{t.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell></TableCell>
              <TableCell>Current Run</TableCell>
              {transactionMetrics.map((t: any) => (
                <TableCell key={t.id}>
                  {selectedTransactionRun !== undefined && selectedTransactionRun.statistics[t.id] !== undefined && (
                    <>
                      {Math.round(selectedTransactionRun.statistics[t.id] * 10) / 10} {t.metric}
                    </>
                  )}
                </TableCell>
              ))}
            </TableRow>
            <TableRow hover>
              <TableCell>
                <Tooltip title="Compares the current run against the current rolling average">
                  <HelpIcon fontSize="small" color="disabled" />
                </Tooltip>
              </TableCell>
              <TableCell>Run vs. Avg</TableCell>
              {transactionMetrics.map((t: any) => getTrend(t, updatedTransaction, selectedRun, 'run'))}
            </TableRow>
            <TableRow hover>
              <TableCell>
                <Tooltip title="Compares the current rolling average against the rolling average 5 runs before">
                  <HelpIcon fontSize="small" color="disabled" />
                </Tooltip>
              </TableCell>
              <TableCell>Avg vs. Avg</TableCell>
              {transactionMetrics.map((t: any) => getTrend(t, updatedTransaction, selectedRun, 'avg'))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TransactionChart
            transaction={updatedTransaction}
            selectedRun={selectedRun}
            transactionMetrics={transactionMetrics}
            metricId={'medianResTime'}
          />
        </Grid>
        <Grid item xs={4}>
          <TransactionChart
            transaction={updatedTransaction}
            selectedRun={selectedRun}
            transactionMetrics={transactionMetrics}
            metricId={'pct1ResTime'}
          />
        </Grid>
        <Grid item xs={4}>
          <TransactionChart
            transaction={updatedTransaction}
            selectedRun={selectedRun}
            transactionMetrics={transactionMetrics}
            metricId={'pct2ResTime'}
          />
        </Grid>
      </Grid>
    </CustomCard>
  );
};
export default Transaction;
