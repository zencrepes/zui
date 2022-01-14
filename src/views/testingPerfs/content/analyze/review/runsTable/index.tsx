import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import CustomCard from '../../../../../../components/customCard';

import SelectTransaction from './selectTransaction';

interface Run {
  id: string;
  name: string;
  startedAt: string;
  runs: any;
  rampUp: number;
}

interface Props {
  run: Run;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const RunsTable: React.FC<Props> = (props: Props) => {
  const [selectedTransaction, setSelectedTransaction] = React.useState<string>('Total');
  const classes = useStyles();
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

  return (
    <CustomCard
      headerTitle="Run metrics"
      headerFactTitle={
        <SelectTransaction
          availableTransactions={availableTransactions}
          selectedTransaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
        />
      }
      headerFactValue=""
    >
      <Typography variant="subtitle2" gutterBottom>
        With a {run.rampUp}s ramp-up
      </Typography>
      <TableContainer>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Transaction</TableCell>
              <TableCell align="right">Users</TableCell>
              <TableCell align="right">Sample count</TableCell>
              <TableCell align="right">Errors count</TableCell>
              <TableCell align="right">Res. Time (Mean)</TableCell>
              <TableCell align="right">Res. Time (90%)</TableCell>
              <TableCell align="right">Res. Time (95%)</TableCell>
              <TableCell align="right">Res. Time (99%)</TableCell>
              <TableCell align="right">Throughput</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {run.runs.edges.map((run: any) => (
              <TableRow key={run.node.id}>
                <TableCell component="th" scope="row">
                  {run.node.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {run.node.statistics.find((s: any) => s.transaction === selectedTransaction).transaction}
                </TableCell>
                <TableCell align="right">{run.node.userCount}</TableCell>
                <TableCell align="right">
                  {run.node.statistics.find((s: any) => s.transaction === selectedTransaction).sampleCount}
                </TableCell>
                <TableCell align="right">
                  {Math.round(run.node.statistics.find((s: any) => s.transaction === selectedTransaction).errorCount)}
                </TableCell>
                <TableCell align="right">
                  {Math.round(run.node.statistics.find((s: any) => s.transaction === selectedTransaction).meanResTime) +
                    'ms'}
                </TableCell>
                <TableCell align="right">
                  {Math.round(run.node.statistics.find((s: any) => s.transaction === selectedTransaction).pct1ResTime) +
                    'ms'}
                </TableCell>
                <TableCell align="right">
                  {Math.round(run.node.statistics.find((s: any) => s.transaction === selectedTransaction).pct2ResTime) +
                    'ms'}
                </TableCell>
                <TableCell align="right">
                  {Math.round(run.node.statistics.find((s: any) => s.transaction === selectedTransaction).pct3ResTime) +
                    'ms'}
                </TableCell>
                <TableCell align="right">
                  {Math.round(run.node.statistics.find((s: any) => s.transaction === selectedTransaction).throughput) +
                    ' q/s'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomCard>
  );
};
export default RunsTable;
