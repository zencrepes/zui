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
  updateIssuesSelected: state.githubIssues.updateIssuesSelected,
  editAction: state.githubIssues.editAction,
  reposAvailable: state.githubIssues.reposAvailable,
  updateTransferSelectedRepoId: state.githubIssues.updateTransferSelectedRepoId,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const StagingTable: React.FC<connectedProps> = (props: connectedProps) => {
  const { updateIssuesSelected, editAction, reposAvailable, updateTransferSelectedRepoId } = props;

  const dstRepo: any = reposAvailable.find((r: any) => r.id === updateTransferSelectedRepoId);

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Action</TableCell>
            <TableCell>Issue</TableCell>
            <TableCell>Source Repo.</TableCell>
            <TableCell>Destination Repo.</TableCell>
            <TableCell>GitHub Verified</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {updateIssuesSelected.map((issue: any) => (
            <TableRow key={issue.id}>
              <TableCell>{editAction}</TableCell>
              <TableCell>{issue.title}</TableCell>
              <TableCell>
                {issue.repository.owner.login}/{issue.repository.name}
              </TableCell>
              <TableCell>
                {dstRepo !== undefined && (
                  <span>
                    {dstRepo.owner.login}/{dstRepo.name}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <RowState issue={issue} />
              </TableCell>
              <TableCell>
                <RemoveButton issue={issue} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default connect(mapState, mapDispatch)(StagingTable);
