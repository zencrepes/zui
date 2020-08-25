import React from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import Card from '../../../../../components/customCard';
import GetAggs from '../data/getAggs';

import { iRootState } from '../../../../../store';

const mapState = (state: iRootState) => ({
  query: state.githubIssues.query,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Labels: React.FC<connectedProps> = (props: connectedProps) => {
  const { query } = props;
  const [labels, setLabels] = React.useState([]);

  return (
    <Card headerTitle="Labels" headerFactTitle="" headerFactValue="">
      <GetAggs field="labels.edges.node.name.keyword" setDataBuckets={setLabels} remainingQuery={query} />

      <Table aria-label="Labels Table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Label</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {labels.slice(0, 20).map((l: any) => {
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
      {labels.length > 20 && (
        <Typography variant="caption" display="block" gutterBottom>
          <i>and {labels.length - 20} more...</i>
        </Typography>
      )}
    </Card>
  );
};

export default connect(mapState, mapDispatch)(Labels);
