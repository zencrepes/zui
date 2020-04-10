import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import NumberCard from './numberCard';

const QUICKNUMBERS_QUERY = loader('./getQuickNumbers.graphql');

interface Props {
  query: any;
  thirtyDaysPrior: any;
  openQuery: Function;
}

const useStyles = makeStyles({
  root: {
    marginLeft: 0,
    marginRight: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const buildQuery = (sourceQuery: any, additionalData: any) => {
  let updatedQuery: any = {};

  if (Object.keys(sourceQuery).length === 0) {
    updatedQuery = {
      op: 'and',
      content: [],
    };
  } else {
    updatedQuery = { ...sourceQuery };
  }

  return {
    ...updatedQuery,
    content: [...updatedQuery.content, ...additionalData],
  };
};

const QuickNumbers: React.FC<Props> = (props: Props) => {
  const { query, thirtyDaysPrior, openQuery } = props;
  const classes = useStyles();

  const openPrsWithoutReview = [
    { op: 'in', content: { field: 'state', value: ['OPEN'] } },
    { op: '<=', content: { field: 'reviewRequests.totalCount', value: 0 } },
  ];

  const openPrsInClosedMilestones = [
    { op: 'in', content: { field: 'state', value: ['OPEN'] } },
    { op: 'in', content: { field: 'milestone.state', value: ['CLOSED'] } },
  ];

  const oldPrs = [
    { op: 'in', content: { field: 'state', value: ['OPEN'] } },
    { op: '<=', content: { field: 'createdAt', value: thirtyDaysPrior } },
  ];

  const { data } = useQuery(QUICKNUMBERS_QUERY, {
    variables: {
      queryPrs: JSON.stringify(query),
      openPrsWithoutReview: JSON.stringify(buildQuery(query, openPrsWithoutReview)),
      openPrsInClosedMilestones: JSON.stringify(buildQuery(query, openPrsInClosedMilestones)),
      oldPrs: JSON.stringify(buildQuery(query, oldPrs)),
    },
    fetchPolicy: 'cache-and-network',
  });

  console.log(data);

  if (data === undefined) {
    return null;
  }
  const cards = [
    {
      key: 1,
      count: data.githubPullrequests.queryPrs.items.totalCount,
      query: query,
      title: 'PRs in current query',
    },
    {
      key: 2,
      count: data.githubPullrequests.oldPrs.items.totalCount,
      query: buildQuery(query, oldPrs),
      title: 'Open PRs older than 30 days',
    },
    {
      key: 3,
      count: data.githubPullrequests.openPrsWithoutReview.items.totalCount,
      query: buildQuery(query, openPrsWithoutReview),
      title: 'Open PRs without review request',
    },
    {
      key: 4,
      count: data.githubPullrequests.openPrsInClosedMilestones.items.totalCount,
      query: buildQuery(query, openPrsInClosedMilestones),
      title: 'Open PRs in Closed Milestones',
    },
  ];

  return (
    <Grid container spacing={3} direction="row" justify="center" alignItems="center" className={classes.root}>
      {cards.map((card: any) => {
        return (
          <Grid item xs={2} key={card.key}>
            <NumberCard count={card.count} title={card.title} query={card.query} openQuery={openQuery} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default QuickNumbers;
