import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

const GQL_QUERY = loader('../../../graphql/getTeams.graphql');

const mapState = () => ({});

const mapDispatch = (dispatch: any) => ({
  setVelocityTeams: dispatch.githubIssues.setVelocityTeams,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const GetAggs: React.FC<connectedProps> = (props: connectedProps) => {
  const { setVelocityTeams } = props;

  const query = {
    op: 'and',
    content: [
      {
        op: 'in',
        content: {
          field: 'labels.edges.node.name.keyword',
          value: ['team'],
        },
      },
    ],
  };

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      query: JSON.stringify(query),
      from: 0,
      size: 500,
      sortField: 'title.keyword',
      sortDirection: 'asc',
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data !== undefined) {
      setVelocityTeams(data.githubIssues.data.items.nodes);
    }
  });

  return null;
};
export default connect(mapState, mapDispatch)(GetAggs);
