import React from 'react';

import Typography from '@material-ui/core/Typography';

import ReactMarkdown from 'react-markdown';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import CustomCard from '../../../../../../components/customCard';
import Edit from './actions/edit';

interface Props {
  run: any;
  updateRunField: (field: string, value: any) => void;
}

const Analysis: React.FC<Props> = (props: Props) => {
  const { run, updateRunField } = props;

  return (
    <CustomCard headerTitle="Run Description" headerFactTitle={<Edit run={run} />} headerFactValue="">
      {run.description === '' ? (
        <i>
          No description available
          <br />
        </i>
      ) : (
        <ReactMarkdown>{run.description}</ReactMarkdown>
      )}
      <br />
      {run.description_by && (
        <Typography variant="subtitle2" gutterBottom align="left">
          By: {run.description_by} on{' '}
          {run.description_date && <>{format(parseISO(run.description_date), 'LLL do yyyy HH:mm')}</>}
        </Typography>
      )}
      <Typography variant="caption" gutterBottom align="left">
        You can use this field to detail the specificities of a run. For example if you used a particular Jahia image or
        different physical resources.
      </Typography>
    </CustomCard>
  );
};

export default Analysis;
