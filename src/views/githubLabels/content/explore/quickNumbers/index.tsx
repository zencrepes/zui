import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import NumberCard from './numberCard';

const QUICKNUMBERS_QUERY = loader('./getQuickNumbers.graphql');

interface Props {
  query: any;
  thirtyDaysPrior: string;
  ninetyDaysPrior: string;
  openQuery: (query: any) => void;
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
  const { query, thirtyDaysPrior, ninetyDaysPrior, openQuery } = props;
  const classes = useStyles();

  const thirtyDays = [{ op: '>=', content: { field: 'createdAt', value: thirtyDaysPrior } }];

  const inactive = [
    { op: '<=', content: { field: 'createdAt', value: ninetyDaysPrior } },
    { op: 'in', content: { field: 'isArchived', value: ['false'] } },
  ];

  const { data } = useQuery(QUICKNUMBERS_QUERY, {
    variables: {
      currentQuery: JSON.stringify(query),
      thirtyDays: JSON.stringify(buildQuery(query, thirtyDays)),
      inactive: JSON.stringify(buildQuery(query, inactive)),
    },
    fetchPolicy: 'network-only',
  });

  if (data === undefined) {
    return null;
  }
  const cards = [
    {
      key: 1,
      count: data.githubLabels.currentQuery.count,
      query: query,
      title: 'In current query',
    },
    {
      key: 2,
      count: data.githubLabels.thirtyDays.count,
      query: buildQuery(query, thirtyDays),
      title: 'Created in the last 30 days',
    },
    // {
    //   key: 3,
    //   count: data.githubLabels.inactive.items.totalCount,
    //   query: buildQuery(query, inactive),
    //   title: 'Have mismatched colors (TO BE ADDED)',
    // },
    // {
    //   key: 4,
    //   count: data.githubLabels.inactive.items.totalCount,
    //   query: buildQuery(query, inactive),
    //   title: 'Colors used across labels (TO BE ADDED)',
    // },
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
