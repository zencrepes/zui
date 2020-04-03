import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Query, Facet } from '../../types';

import OpenButton from './openButton';
import DeleteButton from './deleteButton';

import DisplayQuery from '../../displayQuery';

interface Props {
  query: Query;
  facets: Array<Facet>;
  loadQuery: Function;
  deleteQuery: Function;
}

const QueryRow: React.FC<Props> = (props: Props) => {
  const { query, facets, loadQuery, deleteQuery } = props;

  const openQuery = () => {
    loadQuery(query);
  };

  const removeQuery = () => {
    deleteQuery(query);
  };

  return (
    <TableRow key={query.name}>
      <TableCell padding="none">
        <OpenButton onClick={loadQuery} />
      </TableCell>
      <TableCell scope="row">{query.name}</TableCell>
      <TableCell>
        <DisplayQuery query={query.query} facets={facets} updateQuery={null} />
      </TableCell>
      <TableCell padding="none">
        <DeleteButton onClick={deleteQuery} />
      </TableCell>
    </TableRow>
  );
};

export default QueryRow;
