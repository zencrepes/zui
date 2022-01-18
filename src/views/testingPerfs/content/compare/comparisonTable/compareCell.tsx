import React from 'react';

import { withStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

interface Props {
  data: any;
}

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 800,
    fontSize: theme.typography.pxToRem(10),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const CompareCell: React.FC<Props> = (props: Props) => {
  const { data } = props;

  return (
    <TableCell align="right">
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">Average calculated using:</Typography>
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Run Name</TableCell>
                    <TableCell>Started</TableCell>
                    <TableCell align="right">Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.runs.map((run: any) => (
                    <TableRow key={run.id}>
                      <TableCell>{run.name}</TableCell>
                      <TableCell>{run.startedAt}</TableCell>
                      <TableCell align="right">{Math.round(run.value)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </React.Fragment>
        }
      >
        <span>{Math.round(data.value)}</span>
      </HtmlTooltip>
    </TableCell>
  );
};

export default CompareCell;
