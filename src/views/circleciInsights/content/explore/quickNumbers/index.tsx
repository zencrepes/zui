import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import NumberCard from './numberCard';

const QUICKNUMBERS_QUERY = loader('./getQuickNumbers.graphql');

interface Props {
  query: any;
  sevenDaysPrior: string;
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
  const { query, sevenDaysPrior, openQuery } = props;
  const classes = useStyles();

  const sevenDaysAll = [{ op: '>=', content: { field: 'started_at', value: sevenDaysPrior } }];
  const sevenDaysFailed = [
    { op: '>=', content: { field: 'started_at', value: sevenDaysPrior } },
    { op: 'in', content: { field: 'status', value: ['failed'] } },
  ];

  const { data } = useQuery(QUICKNUMBERS_QUERY, {
    variables: {
      currentQuery: JSON.stringify(query),
      sevenDaysCreated: JSON.stringify(buildQuery(query, sevenDaysAll)),
      sevenDaysClosed: JSON.stringify(buildQuery(query, sevenDaysFailed)),
    },
    fetchPolicy: 'network-only',
  });

  if (data === undefined) {
    return null;
  }
  const cards = [
    {
      key: 1,
      count: data.circleciInsights.currentQuery.count,
      query: query,
      title: 'In current query',
    },
    {
      key: 2,
      count: data.circleciInsights.sevenDaysCreated.count,
      query: buildQuery(query, sevenDaysAll),
      title: 'Total in the past 7 days',
    },
    {
      key: 3,
      count: data.circleciInsights.sevenDaysClosed.count,
      query: buildQuery(query, sevenDaysFailed),
      title: 'Failed in the past 7 days',
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
