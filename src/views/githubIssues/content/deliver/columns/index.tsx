import React from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import DataCard from '../../../../../components/dataCard';
import GetAggs from '../data/getAggs';

import { iRootState } from '../../../../../store';

const mapState = (state: iRootState) => ({
  query: state.githubIssues.query,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Columns: React.FC<connectedProps> = (props: connectedProps) => {
  const { query } = props;
  const [columns, setColumns] = React.useState([]);

  return (
    <DataCard title="Project Columns">
      <GetAggs field="projectCards.edges.node.column.name.keyword" setDataBuckets={setColumns} remainingQuery={query} />

      <Table aria-label="Velocity Table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Column</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {columns.map((c: any) => {
            return (
              <TableRow key={c.key}>
                <TableCell>{c.key === '__missing__' ? 'NONE' : c.key}</TableCell>
                <TableCell>{c.docCount}</TableCell>
                <TableCell>{c.count}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {columns.length > 20 && (
        <Typography variant="caption" display="block" gutterBottom>
          <i>and {columns.length - 20} more...</i>
        </Typography>
      )}
    </DataCard>
  );
};

export default connect(mapState, mapDispatch)(Columns);
