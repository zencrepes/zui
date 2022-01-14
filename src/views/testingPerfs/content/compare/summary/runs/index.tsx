import React from 'react';
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/client';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import ReactMarkdown from 'react-markdown';

import Download from './actions/download';
import Verify from './actions/verify';
import Edit from './actions/edit';
import Open from './actions/open';

const GQL_QUERY_UNVERIFY_RUN = loader('./unverifyRun.graphql');
const GQL_QUERY_VERIFY_RUN = loader('./verifyRun.graphql');

interface Props {
  dataset: any;
  updateRunField: any;
}

const DatasetView: React.FC<Props> = (props: Props) => {
  const { dataset, updateRunField } = props;
  const [openRuns, setOpenRuns] = React.useState<string[]>([]);

  //https://gist.github.com/g1eb/62d9a48164fe7336fdf4845e22ae3d2c
  const convertTime = (srcSeconds: number) => {
    const hours = Math.floor(srcSeconds / 3600);
    const minutes = Math.floor((srcSeconds - hours * 3600) / 60);
    const seconds = srcSeconds - hours * 3600 - minutes * 60;
    if (!!hours) {
      if (!!minutes) {
        return `${hours}h ${minutes}m ${seconds}s`;
      } else {
        return `${hours}h ${seconds}s`;
      }
    }
    if (!!minutes) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  const [unverifyRun] = useMutation(GQL_QUERY_UNVERIFY_RUN);
  const [verifyRun] = useMutation(GQL_QUERY_VERIFY_RUN);

  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Run Name</TableCell>
            <TableCell>Started</TableCell>
            <TableCell align="right">Duration</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataset.runs.map((run: any) => {
            const openable =
              (run.description !== null && run.description !== '') || (run.analysis !== null && run.analysis !== '')
                ? true
                : false;
            const isOpen = openRuns.find((rid: string) => rid === run.id) !== undefined ? true : false;
            return (
              <React.Fragment key={run.id}>
                <TableRow>
                  {openable ? (
                    <TableCell padding="checkbox">
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => {
                          if (!openRuns.includes(run.id)) {
                            const updatedRuns = [...openRuns];
                            updatedRuns.push(run.id);
                            setOpenRuns(updatedRuns);
                          } else {
                            const updatedRuns = openRuns.filter((rid: any) => rid !== run.id);
                            setOpenRuns(updatedRuns);
                          }
                        }}
                      >
                        {openRuns.includes(run.id) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
                  ) : (
                    <TableCell> </TableCell>
                  )}
                  <TableCell component="th" scope="row">
                    {run.name}
                  </TableCell>
                  <TableCell>{format(parseISO(run.startedAt), 'LLL do yyyy - HH:mm')}</TableCell>
                  <TableCell align="right">{convertTime(run.duration)}</TableCell>
                  <TableCell align="right" size="small">
                    <Edit run={run} />
                    <Open run={run} />
                    <Download id={run.id} />
                    <Verify run={run} verifyRun={verifyRun} unverifyRun={unverifyRun} updateRunField={updateRunField} />
                  </TableCell>
                </TableRow>
                {isOpen && (
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                      <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <Box margin={2}>
                          <Typography variant="h5" gutterBottom>
                            Run Description
                          </Typography>
                          <ReactMarkdown>{run.description}</ReactMarkdown>
                          <Divider />
                          <Typography variant="h5" gutterBottom>
                            Run Analysis
                          </Typography>
                          <ReactMarkdown>{run.analysis}</ReactMarkdown>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DatasetView;
