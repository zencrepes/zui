import React from 'react';

import CustomCard from '../../../../../../components/customCard';

import HistoryLineDual from './historyLineDual';
import SelectTransaction from './selectTransaction';

interface Run {
  id: string;
  name: string;
  startedAt: string;
  runs: any;
}

interface Props {
  run: Run;
}

const RunsChart: React.FC<Props> = (props: Props) => {
  const [selectedTransaction, setSelectedTransaction] = React.useState<string>('Total');
  const { run } = props;

  // Get list of available transactions from the first run
  const availableTransactions = run.runs.edges[0].node.statistics
    .reduce((acc: string[], s: any) => {
      if (!acc.includes(s.transaction)) {
        acc.push(s.transaction);
      }
      return acc;
    }, [])
    .sort();

  const chartData = {
    datasets: [
      {
        label: 'Mean resp. time',
        data: run.runs.edges.map((r: any) =>
          Math.round(r.node.statistics.find((s: any) => s.transaction === selectedTransaction).meanResTime),
        ),
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgb(54, 162, 235)',
        pointRadius: 0,
        pointHitRadius: 5,
        type: 'line',
        fill: false,
        yAxisID: 'yleft',
      },
      {
        label: '95%tile resp. time',
        data: run.runs.edges.map((r: any) =>
          Math.round(r.node.statistics.find((s: any) => s.transaction === selectedTransaction).pct2ResTime),
        ),
        backgroundColor: 'rgb(153, 102, 255)',
        borderColor: 'rgb(153, 102, 255)',
        pointRadius: 0,
        pointHitRadius: 5,
        type: 'line',
        fill: false,
        yAxisID: 'yleft',
      },
      {
        label: '500ms limit',
        data: run.runs.edges.map(() => 500),
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        borderDash: [5, 5],
        pointRadius: 0,
        pointHitRadius: 5,
        type: 'line',
        fill: false,
        yAxisID: 'yleft',
      },
      {
        label: 'Throughput',
        data: run.runs.edges.map((r: any) =>
          Math.round(r.node.statistics.find((s: any) => s.transaction === selectedTransaction).throughput),
        ),
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgb(75, 192, 192)',
        type: 'line',
        pointRadius: 0,
        pointHitRadius: 5,
        fill: false,
        yAxisID: 'yright',
      },
    ],
    labels: run.runs.edges.map((run: any) => run.node.userCount),
  };

  return (
    <CustomCard
      headerTitle="Capacity"
      headerFactTitle={
        <SelectTransaction
          availableTransactions={availableTransactions}
          selectedTransaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
        />
      }
      headerFactValue=""
    >
      <HistoryLineDual chartData={chartData} dataset={[]} />
    </CustomCard>
  );
};
export default RunsChart;
