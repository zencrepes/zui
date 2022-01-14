import React from 'react';
import Typography from '@material-ui/core/Typography';
import LaunchIcon from '@material-ui/icons/Launch';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import ReactMarkdown from 'react-markdown';

import Edit from './edit';

import CustomCard from '../../../../../../components/customCard';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

interface Run {
  id: string;
  name: string;
  startedAt: string;
  url: string;
  description: string;
}

interface Props {
  run: Run;
  refetch: any;
}

const RunsTable: React.FC<Props> = (props: Props) => {
  const { run, refetch } = props;

  return (
    <CustomCard
      headerTitle={run.name}
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
          <Edit run={run} refetch={refetch} />
        </>
      }
      headerFactValue=""
    >
      <Typography variant="subtitle2" gutterBottom>
        Id: {run.id}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Started At: {format(parseISO(run.startedAt), 'LLL do yyyy HH:mm')}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Description: {(run.description === null || run.description === '') && <i>No description available</i>}
      </Typography>
      <ReactMarkdown>{run.description}</ReactMarkdown>
    </CustomCard>
  );
};
export default RunsTable;
