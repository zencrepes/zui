import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import LinearProgress from '@material-ui/core/LinearProgress';

import DataCard from '../../../../../components/dataCard';

import Chart from './chart';

const ACTIVITYMATRIX_QUERY = loader('../../../graphql/getActivityMatrix.graphql');

interface Props {
  query: any;
  openMatrixClick: (field: string, fieldValue: string, startWeek: string) => void;
  defaultPoints: boolean;
}

const TeamFocus: React.FC<Props> = (props: Props) => {
  const { query, openMatrixClick, defaultPoints } = props;
  const [field, setField] = React.useState<string>('project.key');

  const { data } = useQuery(ACTIVITYMATRIX_QUERY, {
    variables: {
      query: JSON.stringify(query),
      field: field,
      dateField: 'closedAt',
      aggOptions: JSON.stringify({ points: true }),
    },
    fetchPolicy: 'network-only',
  });
  if (data !== undefined) {
    const dataset = data.jiraIssues.data.matrix;
    return (
      <DataCard title="Focus Heatmap" subtitle="Number of issues closed per aggregated field and per week">
        <Chart
          dataset={dataset}
          field={dataset.field}
          query={query}
          setField={setField}
          openMatrixClick={openMatrixClick}
          defaultPoints={defaultPoints}
        />
      </DataCard>
    );
  }
  return <LinearProgress />;
};

export default TeamFocus;
