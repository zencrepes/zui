import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { iRootState } from '../../../../../../store';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

const GQL_QUERY = loader('./getQueries.graphql');

interface Query {
  id: string;
  name: string;
  query: any;
}

const mapState = (state: iRootState) => ({
  query: state.testingPerfs.query,
  queries: state.testingPerfs.queries,
});

const mapDispatch = (dispatch: any) => ({
  setCompareAvailableQueries: dispatch.testingPerfs.setCompareAvailableQueries,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Query: React.FC<connectedProps> = (props: connectedProps) => {
  const { query, queries, setCompareAvailableQueries } = props;

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      query: JSON.stringify(query),
      dockerImagesfield: 'resources.edges.node.image',
    },
    fetchPolicy: 'network-only',
  });

  const buildQueries: Query[] = [];
  if (data !== undefined) {
    for (const run of data.testingPerfs.data.items.nodes) {
      const queryName = 'Single Run: ' + format(parseISO(run.startedAt), 'LLL do yyyy HH:mm') + ' - ' + run.name;
      buildQueries.push({
        id: queryName,
        name: queryName,
        query: {
          op: 'and',
          content: [
            {
              op: 'in',
              content: {
                field: 'id',
                value: [run.id],
              },
            },
          ],
        },
      });
    }
    for (const image of data.testingPerfs.data.dockerImages.buckets) {
      const queryName = 'Docker Container: ' + image.key;
      buildQueries.push({
        id: queryName,
        name: queryName,
        query: {
          op: 'and',
          content: [
            {
              op: 'in',
              content: {
                field: 'resources.edges.node.image',
                value: [image.key],
              },
            },
          ],
        },
      });
    }

    for (const savedQuery of queries) {
      const queryName = 'Saved Query: ' + savedQuery.name;
      buildQueries.push({
        id: queryName,
        name: queryName,
        query: savedQuery.query,
      });
    }
  }

  useEffect(() => {
    if (data !== undefined) {
      setCompareAvailableQueries(buildQueries);
    }
  });

  return null;
};

export default connect(mapState, mapDispatch)(Query);