import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CustomCard from '../../../../../components/customCard';

interface Props {
  resources: any;
}

const DatasetView: React.FC<Props> = (props: Props) => {
  const { resources } = props;

  return (
    <CustomCard headerTitle="Resources" headerFactTitle="" headerFactValue="">
      <TableContainer>
        <Table size="small" aria-label="Resources part of the run">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources.map((r: any) => (
              <TableRow key={r.node.id}>
                <TableCell component="th" scope="row">
                  {r.node.name}
                </TableCell>
                <TableCell>{r.node.image}</TableCell>
                <TableCell>{r.node.size}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomCard>
  );
};

export default DatasetView;
