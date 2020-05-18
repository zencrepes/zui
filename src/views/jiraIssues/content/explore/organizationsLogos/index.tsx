import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import CustomCard from '../../../../../components/customCard';

const OPENBYREPO_QUERY = loader('./gqlQuery.graphql');

interface Props {
  query: any;
  openQuery: Function;
}

const buildByAggClickQuery = (query: any, field: string, value: string) => {
  let updatedQuery: any = {};

  if (Object.keys(query).length === 0) {
    updatedQuery = {
      op: 'and',
      content: [{ op: 'in', content: { field: field, value: [value] } }],
    };
  } else {
    updatedQuery = {
      ...query,
      content: [...query.content, ...[{ op: 'in', content: { field: field, value: [value] } }]],
    };
  }
  return updatedQuery;
};

const OrganizationsLogos: React.FC<Props> = (props: Props) => {
  const { query, openQuery } = props;

  const field = 'organizations.edges.node.login';

  const onAggClick = (key: string) => {
    const updatedQuery = buildByAggClickQuery(query, field, key);
    openQuery(updatedQuery);
  };

  const { data } = useQuery(OPENBYREPO_QUERY, {
    variables: {
      field: field,
      aggOptions: JSON.stringify({ metadata: ['avatarUrl'], disjoint: false }),
      query: JSON.stringify(query),
    },
    fetchPolicy: 'no-cache',
  });
  if (data !== undefined && data.jiraIssues.data !== undefined && data.jiraIssues.data.aggregations !== undefined) {
    const buckets = data.jiraIssues.data.aggregations.buckets;

    return (
      <CustomCard headerTitle={'Users Organizations'} headerFactTitle="" headerFactValue="">
        {buckets
          .filter((b: any) => b.key !== '__missing__')
          .map((bucket: any) => {
            const metadata = JSON.parse(bucket.metadata);
            return (
              <Chip
                key={bucket.key}
                avatar={<Avatar alt={metadata.login} src={metadata.avatarUrl} />}
                onClick={() => {
                  onAggClick(bucket.key);
                }}
                label={bucket.key}
                variant="outlined"
              />
            );
          })}
      </CustomCard>
    );
  }
  return <span>Loading data</span>;
};

export default OrganizationsLogos;
