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

const Assignees: React.FC<connectedProps> = (props: connectedProps) => {
  const { query } = props;
  const [assignees, setAssignees] = React.useState([]);

  return (
    <DataCard title="Assignees">
      <GetAggs field="assignees.edges.node.login" setDataBuckets={setAssignees} remainingQuery={query} />

      <Table aria-label="Labels Table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Label</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignees.slice(0, 20).map((l: any) => {
            return (
              <TableRow key={l.key}>
                <TableCell>{l.key === '__missing__' ? 'NONE' : l.key}</TableCell>
                <TableCell>{l.docCount}</TableCell>
                <TableCell>{l.count}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {assignees.length > 20 && (
        <Typography variant="caption" display="block" gutterBottom>
          <i>and {assignees.length - 20} more...</i>
        </Typography>
      )}
    </DataCard>
  );
};

export default connect(mapState, mapDispatch)(Assignees);
