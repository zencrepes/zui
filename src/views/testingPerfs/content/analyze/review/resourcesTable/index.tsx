import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import CustomCard from '../../../../../../components/customCard';

interface Run {
  id: string;
  name: string;
  startedAt: string;
  resources: any;
  platform: any;
}

interface Props {
  run: Run;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ResourcesTable: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { run } = props;

  return (
    <CustomCard headerTitle="Execution environment" headerFactTitle="" headerFactValue="">
      <Typography variant="subtitle2" gutterBottom>
        Performed on {run.platform.vendor} ({run.platform.region})
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {run.resources.edges.map((run: any) => (
              <TableRow key={run.node.id}>
                <TableCell component="th" scope="row">
                  {run.node.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {run.node.image}
                </TableCell>
                <TableCell component="th" scope="row">
                  {run.node.size}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomCard>
  );
};
export default ResourcesTable;
