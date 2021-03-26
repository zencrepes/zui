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
  updateReposSelected: state.githubMavenPoms.updateReposSelected,
  editAction: state.githubMavenPoms.editAction,
  updateTeamSlug: state.githubMavenPoms.updateTeamSlug,
  updateTeamPermission: state.githubMavenPoms.updateTeamPermission,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const StagingTable: React.FC<connectedProps> = (props: connectedProps) => {
  const { updateReposSelected, editAction, updateTeamSlug, updateTeamPermission } = props;

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Action</TableCell>
            <TableCell>Organization</TableCell>
            <TableCell>Repository</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Permission</TableCell>
            <TableCell>GitHub Verified</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {updateReposSelected.map((repo: any) => (
            <TableRow key={repo.id}>
              <TableCell>{editAction}</TableCell>
              <TableCell>{repo.owner.login}</TableCell>
              <TableCell>{repo.name}</TableCell>
              <TableCell>{updateTeamSlug}</TableCell>
              <TableCell>{updateTeamPermission}</TableCell>
              <TableCell>
                <RowState label={repo} />
              </TableCell>
              <TableCell>
                <RemoveButton label={repo} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default connect(mapState, mapDispatch)(StagingTable);
