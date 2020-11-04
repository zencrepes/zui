import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import NumberCard from '../../../../../components/numberCard';

const QUICKNUMBERS_QUERY = loader('../../../graphql/getQuickNumbers.graphql');

interface Props {
  query: any;
  defaultPoints: boolean;
  thirtyDaysPrior: any;
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
  const { query, thirtyDaysPrior, openQuery, defaultPoints } = props;
  const classes = useStyles();

  const openIssuesWithoutAssignee = [
    { op: 'in', content: { field: 'state', value: ['OPEN'] } },
    { op: '<=', content: { field: 'assignees.totalCount', value: 0 } },
  ];

  const openIssuesInClosedMilestones = [
    { op: 'in', content: { field: 'state', value: ['OPEN'] } },
    { op: 'in', content: { field: 'milestone.state', value: ['CLOSED'] } },
  ];

  const oldIssues = [
    { op: 'in', content: { field: 'state', value: ['OPEN'] } },
    { op: '<=', content: { field: 'createdAt', value: thirtyDaysPrior } },
  ];

  const { data } = useQuery(QUICKNUMBERS_QUERY, {
    variables: {
      queryPrs: JSON.stringify(query),
      openIssuesWithoutAssignee: JSON.stringify(buildQuery(query, openIssuesWithoutAssignee)),
      openIssuesInClosedMilestones: JSON.stringify(buildQuery(query, openIssuesInClosedMilestones)),
      oldIssues: JSON.stringify(buildQuery(query, oldIssues)),
    },
    fetchPolicy: 'network-only',
  });

  if (data === undefined) {
    return null;
  }
  const unit = defaultPoints ? 'Points' : 'Issues';
  const cards = [
    {
      key: 1,
      count: defaultPoints === true ? data.githubIssues.queryPrs.metrics.sum : data.githubIssues.queryPrs.count,
      query: query,
      title: unit + ' in current query',
    },
    {
      key: 2,
      count: defaultPoints === true ? data.githubIssues.oldIssues.metrics.sum : data.githubIssues.oldIssues.count,
      query: buildQuery(query, oldIssues),
      title: unit + ' open for more than 30 days',
    },
    {
      key: 3,
      count:
        defaultPoints === true
          ? data.githubIssues.openIssuesWithoutAssignee.metrics.sum
          : data.githubIssues.openIssuesWithoutAssignee.count,
      query: buildQuery(query, openIssuesWithoutAssignee),
      title: unit + ' open without assignee',
    },
    {
      key: 4,
      count:
        defaultPoints === true
          ? data.githubIssues.openIssuesInClosedMilestones.metrics.sum
          : data.githubIssues.openIssuesInClosedMilestones.count,
      query: buildQuery(query, openIssuesInClosedMilestones),
      title: unit + ' open in Closed Milestones',
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
