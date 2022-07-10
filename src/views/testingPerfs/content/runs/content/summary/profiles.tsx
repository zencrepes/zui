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
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CustomCard from '../../../../../../components/customCard';

interface Props {
  run: any;
}

const Profiles: React.FC<Props> = (props: Props) => {
  const { run } = props;

  return (
    <CustomCard headerTitle="Profiles" headerFactTitle="" headerFactValue="">
      <TableContainer>
        <Table size="small" aria-label="Profiles available in the run">
          <TableBody>
            {run.runs.edges.map((r: any, idxb: number) => (
              <TableRow key={r.node.name}>
                <TableCell>{r.node.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomCard>
  );
};

export default Profiles;
