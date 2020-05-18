import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { SavedQuery, Facet } from '../../../../global';

import QueryRow from './queryRow';

interface Props {
  queries: Array<SavedQuery>;
  facets: Array<Facet>;
  loadQuery: Function;
  deleteQuery: Function;
}

const QueriesTable: React.FC<Props> = (props: Props) => {
  const { queries, facets, loadQuery, deleteQuery } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="none"></TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Filter</TableCell>
          <TableCell padding="none"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {queries.map((query) => {
          return (
            <QueryRow key={query.name} query={query} facets={facets} loadQuery={loadQuery} deleteQuery={deleteQuery} />
          );
        })}
      </TableBody>
    </Table>
  );
};

export default QueriesTable;
