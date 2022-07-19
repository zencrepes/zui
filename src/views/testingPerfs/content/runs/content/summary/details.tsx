import React from 'react';
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/client';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import LaunchIcon from '@material-ui/icons/Launch';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import CustomCard from '../../../../../../components/customCard';

import Download from './actions/download';
import Verify from './actions/verify';
import Edit from './actions/edit';

const GQL_QUERY_UNVERIFY_RUN = loader('./actions/unverifyRun.graphql');
const GQL_QUERY_VERIFY_RUN = loader('./actions/verifyRun.graphql');

interface Props {
  run: any;
  updateRunField: (content: { field: string; value: any }[]) => void;
}

const Details: React.FC<Props> = (props: Props) => {
  const { run, updateRunField } = props;

  const [unverifyRun] = useMutation(GQL_QUERY_UNVERIFY_RUN);
  const [verifyRun] = useMutation(GQL_QUERY_VERIFY_RUN);

  return (
    <CustomCard
      headerTitle="Overview"
      headerFactTitle={
        <>
          <Tooltip title={'Open source URL in the CI/CD platform'}>
            <IconButton
              aria-label="Open Run in cicd platform"
              size="small"
              color={'default'}
              href={run.url}
              target="_blank"
            >
              <LaunchIcon />
            </IconButton>
          </Tooltip>
          <Download id={run.id} />
          <Verify run={run} verifyRun={verifyRun} unverifyRun={unverifyRun} updateRunField={updateRunField} />
        </>
      }
      headerFactValue=""
    >
      <TableContainer>
        <Table size="small" aria-label="Details about the run itself">
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{run.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Started At</TableCell>
              <TableCell>{format(parseISO(run.startedAt), 'LLL do yyyy HH:mm')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Duration</TableCell>
              <TableCell>{run.duration}s</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Group</TableCell>
              <TableCell>
                {run.group} <Edit run={run} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Platform</TableCell>
              <TableCell>
                {run.platform.vendor} ({run.platform.region})
              </TableCell>
            </TableRow>
            {run.tags !== undefined && (
              <TableRow>
                <TableCell>Tags</TableCell>
                <TableCell>
                  {run.tags.edges.map((t: any) => (
                    <span key={t.node.name}>{t.node.name}</span>
                  ))}
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>Runs</TableCell>
              <TableCell>
                {run.runs.edges.map((r: any) => (
                  <span key={r.node.name}>{r.node.name}, </span>
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </CustomCard>
  );
};

export default Details;
