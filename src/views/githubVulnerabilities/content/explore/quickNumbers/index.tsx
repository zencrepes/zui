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

  const oldVulns = [{ op: '<=', content: { field: 'createdAt', value: thirtyDaysPrior } }];

  const dismissedVulns = [{ op: '<=', content: { field: 'dismissedAt', value: thirtyDaysPrior } }];

  const { data } = useQuery(QUICKNUMBERS_QUERY, {
    variables: {
      queryVulns: JSON.stringify(query),
      oldVulns: JSON.stringify(buildQuery(query, oldVulns)),
      dismissedVulns: JSON.stringify(buildQuery(query, dismissedVulns)),
    },
    fetchPolicy: 'cache-and-network',
  });

  if (data === undefined) {
    return null;
  }
  const cards = [
    {
      key: 1,
      count: data.githubVulnerabilities.queryVulns.items.totalCount,
      query: query,
      title: 'In current query',
    },
    {
      key: 2,
      count: data.githubVulnerabilities.oldVulns.items.totalCount,
      query: buildQuery(query, oldVulns),
      title: 'Older than 30 days',
    },
    {
      key: 3,
      count: data.githubVulnerabilities.dismissedVulns.items.totalCount,
      query: buildQuery(query, dismissedVulns),
      title: 'Dismissed alerts',
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
