import React from 'react';
import Typography from '@material-ui/core/Typography';

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
  analysis: string;
  analysis_by: string;
  analysis_date: string;
}

interface Props {
  run: Run;
  refetch: any;
}

const RunsTable: React.FC<Props> = (props: Props) => {
  const { run, refetch } = props;

  return (
    <CustomCard headerTitle={'Analysis'} headerFactTitle={<Edit run={run} refetch={refetch} />} headerFactValue="">
      <Typography variant="subtitle2" gutterBottom>
        {run.analysis_date !== null && run.analysis_date !== '' && run.analysis_date !== undefined && (
          <span>
            Updated by: {run.analysis_by} on {format(parseISO(run.analysis_date), 'LLL do yyyy HH:mm')}
          </span>
        )}
      </Typography>
      {run.analysis === null || run.analysis === '' ? (
        <i>No analysis available</i>
      ) : (
        <ReactMarkdown>{run.analysis}</ReactMarkdown>
      )}
    </CustomCard>
  );
};
export default RunsTable;
