import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid';

import randomColor from 'randomcolor';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import CustomCard from '../../../../../components/customCard';

import Toolbar from './toolbar';

import HistoryLineDual from './historyLineDual';

const GQL_QUERY = loader('./getCapacity.graphql');

interface Props {
  query: any;
}

const UsersCapacity: React.FC<Props> = (props: Props) => {
  const { query } = props;
  const [selectedTransaction, setTransaction] = React.useState<string>('Total');
  const [selectedMetricType, setMetricType] = React.useState<string>('meanResTime');
  const [selectedMetricValue, setMetricValue] = React.useState<number>(500);

  const availableMetricType = [
    { value: 'meanResTime', name: 'Mean response time', unit: 'ms' },
    { value: 'pct1ResTime', name: '90%ile response time', unit: 'ms' },
    { value: 'pct2ResTime', name: '95%ile response time', unit: 'ms' },
    { value: 'pct3ResTime', name: '99%ile response time', unit: 'ms' },
    { value: 'throughput', name: 'Throughput', unit: 'q/a' },
  ];

  const selectedMetricTypeObj = availableMetricType.find((m: any) => m.value === selectedMetricType);

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      query: JSON.stringify(query),
      selectedTransaction: selectedTransaction,
    },
    fetchPolicy: 'network-only',
  });
  if (data !== undefined) {
    const reports = data.testingPerfs.data.items.nodes;

    const availableUsers = reports
      .reduce((acc: string[], u: any) => {
        for (const run of u.runs.edges) {
          if (!acc.includes(run.node.userCount)) {
            acc.push(run.node.userCount);
          }
        }
        return acc;
      }, [])
      .sort();

    const dataLines = availableUsers.map((userCount: number) => {
      const color = randomColor({
        luminosity: 'light',
        format: 'rgb', // e.g. 'rgb(225,200,20)'
        seed: userCount + 'seed',
      });
      return {
        type: 'line',
        label: userCount + ' users',
        data: reports.map((report: any) => {
          // Find the run containing that number of users
          const selectedRun = report.runs.edges.find((run: any) => run.node.userCount === userCount);
          if (selectedRun === undefined) {
            return null;
          } else {
            return Math.round(selectedRun.node.statistics[0][selectedMetricType]);
          }
        }),
        backgroundColor: color,
        borderColor: color,
        fill: false,
      };
    });

    // Build an error area if there is some data with positive errors
    const errorLine = {
      type: 'line',
      label: 'Error zone',
      data: reports.map((report: any) => {
        // Find the run containing that number of users
        // For that report, get the runs containing errors (and sort them)
        const errorRuns = report.runs.edges
          .filter((run: any) => run.node.statistics[0]['errorCount'] > 0)
          .sort((a: any, b: any) => a.node.statistics[0]['errorCount'] - b.node.statistics[0]['errorCount']);
        if (errorRuns.length === 0) {
          return null;
        }
        return Math.round(errorRuns[0].node.statistics[0][selectedMetricType]);
      }),
      backgroundColor: 'rgb(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132, 0.5)',
      fill: 'end',
    };

    const warningLine = {
      type: 'line',
      label: 'Warning zone',
      data: reports.map(() => {
        return selectedMetricValue;
      }),
      backgroundColor: 'rgb(255, 159, 64, 0.2)',
      borderColor: 'rgb(255, 159, 64, 0.2)',
      fill: 'end',
    };

    const chartData = {
      datasets: [...dataLines, ...[warningLine], ...[errorLine]],
      reports: reports.map((report: any) => report.name),
      labels: reports.map((report: any) => format(parseISO(report.startedAt), 'LLL do yyyy HH:MM')),
    };

    return (
      <CustomCard
        headerTitle={'Response times'}
        headerFactTitle={
          <Toolbar
            availableTransactions={data.testingPerfs.data.transactions.buckets.map((t: any) => t.key)}
            selectedTransaction={selectedTransaction}
            setTransaction={setTransaction}
            selectedMetricType={selectedMetricType}
            setMetricType={setMetricType}
            availableMetricType={availableMetricType}
            selectedMetricValue={selectedMetricValue}
            setMetricValue={setMetricValue}
          />
        }
        headerFactValue={''}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <HistoryLineDual selectedMetricType={selectedMetricTypeObj} chartData={chartData} />
          </Grid>
        </Grid>
      </CustomCard>
    );
  }
  return <span>Loading data</span>;
};

export default UsersCapacity;
