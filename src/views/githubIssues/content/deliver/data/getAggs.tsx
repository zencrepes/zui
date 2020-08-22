import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { iRootState } from '../../../../../store';

const GQL_QUERY = loader('../../../graphql/getAggsTermsData.graphql');

interface Props {
  setDataBuckets: Function;
  field: string;
  remainingQuery: any;
  disjoint?: boolean;
  tag?: string;
}

const mapState = (state: iRootState) => ({
  defaultPoints: state.githubIssues.defaultPoints,
  configFacets: state.githubIssues.configFacets,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const GetAggs: React.FC<connectedProps> = (props: connectedProps) => {
  const { remainingQuery, defaultPoints, setDataBuckets, field, disjoint, tag } = props;

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      field,
      query: JSON.stringify(remainingQuery),
      aggOptions: JSON.stringify({
        points: defaultPoints,
        disjoint: disjoint === undefined ? false : disjoint,
        tag: tag === undefined ? undefined : tag,
      }),
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data !== undefined) {
      setDataBuckets(data.githubIssues.data.aggregations.buckets);
    }
  });

  return null;
};
export default connect(mapState, mapDispatch)(GetAggs);
