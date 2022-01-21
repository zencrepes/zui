import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import randomColor from 'randomcolor';
import { ChartDataSets } from 'chart.js';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import SelectData from './selectData';
import HistoryLineDual from './historyLineDual';

import { iRootState } from '../../../../../store';
import CustomCard from '../../../../../components/customCard';

interface Run {
  name: string;
  startedAt: string;
  value: number;
}

interface MetricTransaction {
  name: string;
  type: string;
  runs: Run[];
}

const mapState = (state: iRootState) => ({
  compareData: state.testingPerfs.compareData,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Evolution: React.FC<connectedProps> = (props: connectedProps) => {
  const { compareData } = props;

  const [metrics, setMetric] = React.useState<string[]>([]);
  const [transactions, setTransactions] = React.useState<string[]>([]);

  if (
    Object.keys(compareData).length === 0 ||
    Object.keys(compareData.reference).length === 0 ||
    Object.keys(compareData.comparison).length === 0
  ) {
    return null;
  }

  // From the dataset, we build one "line" per TransactionMetric (all possible combinations)
  const metricTransactions: MetricTransaction[] = [];
  for (const metric of metrics) {
    for (const transaction of transactions) {
      const sourceCompData = compareData.comparison.average.find(
        (d: any) => d.transaction === transaction && d.statisticsKey === metric,
      );
      if (sourceCompData !== undefined) {
        metricTransactions.push({
          name: `${transaction} - ${metric}`,
          type: 'comparison',
          runs: [...sourceCompData.runs].sort(
            (a: any, b: any) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime(),
          ),
        });
      }
      const sourceRefData = compareData.reference.average.find(
        (d: any) => d.transaction === transaction && d.statisticsKey === metric,
      );
      if (sourceRefData !== undefined) {
        metricTransactions.push({
          name: `${transaction} - ${metric}`,
          type: 'reference',
          runs: [...sourceRefData.runs].sort(
            (a: any, b: any) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime(),
          ),
        });
      }
    }
  }

  const chartData = {
    datasets: metricTransactions.map((t: MetricTransaction) => {
      const color = randomColor({
        luminosity: 'light',
        format: 'rgb', // e.g. 'rgb(225,200,20)'
        seed: t.name,
      });

      let dataline: ChartDataSets = {
        type: 'line',
        // pointStyle: 'triangle',
        // borderDash: [5, 5],
        label: `${t.name} (${t.type})`,
        data: t.runs.map((r: any) => Math.round(r.value)),
        backgroundColor: color,
        borderColor: color,
        fill: false,
      };
      if (t.type === 'reference') {
        dataline = {
          ...dataline,
          pointStyle: 'triangle',
          pointBorderWidth: 8,
          borderDash: [5, 5],
        };
      }
      return dataline;
    }),
    labels:
      metricTransactions.length > 0
        ? metricTransactions[0].runs.map((r: Run) => format(parseISO(r.startedAt), 'LLL do yyyy - HH:mm'))
        : [],
  };

  return (
    <CustomCard headerTitle="Metrics evolution over time" headerFactTitle="" headerFactValue="">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
            <Grid item xs={6}>
              <SelectData
                title={'Transaction'}
                availableValues={compareData.reference.transactions}
                selectedValues={transactions}
                setSelectedValues={setTransactions}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectData
                title={'Metric'}
                availableValues={compareData.reference.statisticsKeys}
                selectedValues={metrics}
                setSelectedValues={setMetric}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {metrics.length === 0 || transactions.length === 0 ? (
            <span>Please select at least one metric and one transaction</span>
          ) : (
            <HistoryLineDual chartData={chartData} dataset={[]} />
          )}
        </Grid>
      </Grid>{' '}
    </CustomCard>
  );
};

export default connect(mapState, mapDispatch)(Evolution);
