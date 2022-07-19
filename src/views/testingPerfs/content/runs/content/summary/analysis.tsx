import React from 'react';

import Typography from '@material-ui/core/Typography';

import ReactMarkdown from 'react-markdown';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import CustomCard from '../../../../../../components/customCard';
import Edit from './actions/edit';

interface Props {
  run: any;
}

const Analysis: React.FC<Props> = (props: Props) => {
  const { run } = props;

  return (
    <CustomCard headerTitle="Run Analysis" headerFactTitle={<Edit run={run} />} headerFactValue="">
      {run.analysis === '' ? (
        <i>
          No analysis available <br />
        </i>
      ) : (
        <ReactMarkdown>{run.analysis}</ReactMarkdown>
      )}
      <br />
      {run.analysis_by && (
        <Typography variant="subtitle2" gutterBottom align="left">
          By: {run.analysis_by} on{' '}
          {run.analysis_date && <>{format(parseISO(run.analysis_date), 'LLL do yyyy HH:mm')}</>}
        </Typography>
      )}
      <Typography variant="caption" gutterBottom align="left">
        You can use the analysis field to detail the conclusion of a run review. You can use this field to detail your
        findings.
      </Typography>
    </CustomCard>
  );
};

export default Analysis;
