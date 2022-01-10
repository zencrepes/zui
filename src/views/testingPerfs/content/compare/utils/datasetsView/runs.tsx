import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import Download from './download';

interface Props {
  dataset: any;
}

const DatasetView: React.FC<Props> = (props: Props) => {
  const { dataset } = props;

  //https://gist.github.com/g1eb/62d9a48164fe7336fdf4845e22ae3d2c
  const convertTime = (srcSeconds: number) => {
    const hours = Math.floor(srcSeconds / 3600);
    const minutes = Math.floor((srcSeconds - hours * 3600) / 60);
    const seconds = srcSeconds - hours * 3600 - minutes * 60;
    if (!!hours) {
      if (!!minutes) {
        return `${hours}h ${minutes}m ${seconds}s`;
      } else {
        return `${hours}h ${seconds}s`;
      }
    }
    if (!!minutes) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  return (
    <>
      <Toolbar>
        <Typography variant="h6">Runs included in the analysis</Typography>
      </Toolbar>
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Run Name</TableCell>
              <TableCell>Started</TableCell>
              <TableCell align="right">Duration</TableCell>
              <TableCell>d/l</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataset.runs.map((run: any) => (
              <TableRow key={run.id}>
                <TableCell component="th" scope="row">
                  {run.name}
                </TableCell>
                <TableCell>{format(parseISO(run.startedAt), 'LLL do yyyy - HH:mm')}</TableCell>
                <TableCell align="right">{convertTime(run.duration)}</TableCell>
                <TableCell>
                  <Download id={run.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DatasetView;
