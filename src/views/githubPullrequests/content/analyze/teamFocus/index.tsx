import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import LinearProgress from '@material-ui/core/LinearProgress';

import CustomCard from '../../../../../components/customCard';

import Chart from './chart';

const ACTIVITYMATRIX_QUERY = loader('./getActivityMatrix.graphql');

interface Props {
  query: any;
  openMatrixClick: (field: string, fieldValue: string, startWeek: string) => void;
}

const TeamFocus: React.FC<Props> = (props: Props) => {
  const { query, openMatrixClick } = props;
  const [field, setField] = React.useState<string>('repository.name.keyword');

  const { data } = useQuery(ACTIVITYMATRIX_QUERY, {
    variables: {
      query: JSON.stringify(query),
      field: field,
      dateField: 'createdAt',
    },
    fetchPolicy: 'cache-and-network',
  });
  if (data !== undefined) {
    const dataset = data.githubPullrequests.data.activity;
    return (
      <CustomCard
        headerTitle="Focus Heatmap"
        headerFactTitle="Number of PRs closed per aggregation field and per week"
        headerFactValue=""
      >
        <Chart
          dataset={dataset}
          field={dataset.field}
          query={query}
          setField={setField}
          openMatrixClick={openMatrixClick}
        />
      </CustomCard>
    );
  }
  return <LinearProgress />;
};

export default TeamFocus;
