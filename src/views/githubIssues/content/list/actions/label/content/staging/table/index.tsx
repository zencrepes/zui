import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import { iRootState } from '../../../../../../../../../store';

import RowState from './rowState';
import RemoveButton from './removeButton';

const mapState = (state: iRootState) => ({
  updateIssuesSelected: state.githubIssues.updateIssuesSelected,
  verifiedIssues: state.githubIssues.verifiedIssues,
  editAction: state.githubIssues.editAction,
  reposAvailable: state.githubIssues.reposAvailable,
  updateAddLabelName: state.githubIssues.updateAddLabelName,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const StagingTable: React.FC<connectedProps> = (props: connectedProps) => {
  const { updateIssuesSelected, editAction, updateAddLabelName, verifiedIssues } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [onlyErrors, setOnlyErrors] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      {verifiedIssues.filter((i: any) => i.error === true).length > 0 && (
        <Button
          onClick={() => {
            setOnlyErrors(!onlyErrors);
          }}
          color="primary"
        >
          {onlyErrors ? 'All issues' : 'Only errors'}
        </Button>
      )}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Issue</TableCell>
              <TableCell>Source Repo.</TableCell>
              <TableCell>New Label</TableCell>
              <TableCell>GitHub Verified</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {updateIssuesSelected
              .filter((i: any) => {
                const foundIssue: any[] = verifiedIssues.filter((vi: any) => vi.id === i.id);
                if (foundIssue.length === 0) {
                  return false;
                } else if (onlyErrors === true) {
                  if (foundIssue[0].error === true) {
                    return true;
                  }
                }
                return true;
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((issue: any) => (
                <TableRow key={issue.id}>
                  <TableCell>{editAction}</TableCell>
                  <TableCell>{issue.title}</TableCell>
                  <TableCell>
                    {issue.repository.owner.login}/{issue.repository.name}
                  </TableCell>
                  <TableCell>{updateAddLabelName}</TableCell>
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={updateIssuesSelected.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};
export default connect(mapState, mapDispatch)(StagingTable);
