import React from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { iRootState } from '../../../../../../../../../store';

import RowState from './rowState';
import RemoveButton from './removeButton';

const mapState = (state: iRootState) => ({
  updateLabelsSelected: state.githubLabels.updateLabelsSelected,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const StagingTable: React.FC<connectedProps> = (props: connectedProps) => {
  const { updateLabelsSelected } = props;

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Action</TableCell>
            <TableCell>Organization</TableCell>
            <TableCell>Repository</TableCell>
            <TableCell>Label</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>GitHub Verified</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {updateLabelsSelected.map((label: any) => (
            <TableRow key={label.id}>
              <TableCell>Delete</TableCell>
              <TableCell>{label.repository.owner.login}</TableCell>
              <TableCell>{label.repository.name}</TableCell>
              <TableCell>{label.name}</TableCell>
              <TableCell>{label.color}</TableCell>
              <TableCell>{label.description}</TableCell>
              <TableCell>
                <RowState label={label} />
              </TableCell>
              <TableCell>
                <RemoveButton label={label} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default connect(mapState, mapDispatch)(StagingTable);
