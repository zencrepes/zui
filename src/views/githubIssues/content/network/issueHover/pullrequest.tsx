import React from 'react';
import XRegExp from 'xregexp';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';

import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

import { Label, CounterLabel, Avatar } from '@primer/components';

import DataCard from '../../../../../components/dataCard';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '260px',
    width: '100%',
    padding: '5px',
    textAlign: 'left',
  },
  repoName: {
    color: '#586069!important',
    fontSize: '14px',
    marginRight: '5px',
    textDecoration: 'none',
  },
  issueTitle: {
    fontSize: '14px',
    color: '#000000!important',
    textDecoration: 'none',
  },
  authorLink: {
    textDecoration: 'none',
    fontSize: '12px',
    color: '#586069!important',
  },
  issueSubTitle: {
    textDecoration: 'none',
    fontSize: '10px',
    color: '#586069!important',
  },
  avatar: {
    width: 20,
    height: 20,
  },
  chip: {
    marginRight: '5px',
    height: 25,
  },
  iconOpen: {
    margin: theme.spacing(1),
    fontSize: 20,
    color: red[800],
  },
  iconClosed: {
    margin: theme.spacing(1),
    fontSize: 20,
    color: green[800],
  },
  iconSprint: {
    fontSize: 16,
    margin: 0,
  },
  label: {
    marginRight: 5,
    marginTop: 10,
    padding: 5,
    border: '1px solid #eeeeee',
  },
  chipAgile: {
    margin: '4px',
    height: '15px',
  },
}));

const GQL_SINGLEPR = loader('../../../graphql/getPullrequest.graphql');

type Props = {
  node: any;
};

const PullRequest: React.FC<Props> = (props: Props) => {
  const { node } = props;
  const classes = useStyles();

  const pointsExp = XRegExp('SP:[.\\d]');

  const { data } = useQuery(GQL_SINGLEPR, {
    variables: {
      id: node.id,
    },
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  });

  if (data === undefined || data.githubPullrequests.data === undefined || data.githubPullrequests.data.item === null) {
    return null;
  }
  const issue: any = data.githubPullrequests.data.item;

  return (
    <DataCard>
      <div className={classes.root}>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item xs={12} sm container>
            <a href={issue.repository.url} className={classes.repoName} target="_blank" rel="noopener noreferrer">
              {issue.repository.owner.login}/{issue.repository.name}
            </a>
          </Grid>
          {issue.assignees.totalCount > 0 && (
            <React.Fragment>
              {issue.assignees.edges.map((assignee: any) => {
                return (
                  <Grid item key={assignee.node.login}>
                    <Tooltip
                      title={
                        assignee.node.name === null || assignee.node.name === ''
                          ? assignee.node.login
                          : assignee.node.name
                      }
                    >
                      <Avatar src={assignee.node.avatarUrl} />
                    </Tooltip>
                  </Grid>
                );
              })}
            </React.Fragment>
          )}
          <Grid item>
            <CounterLabel>{issue.points}</CounterLabel>
          </Grid>
        </Grid>
        <Grid item xs={12} sm container>
          <a href={issue.url} className={classes.issueTitle} target="_blank" rel="noopener noreferrer">
            {issue.title}
          </a>
        </Grid>

        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={0}>
          {issue.labels.totalCount > 0 && (
            <React.Fragment>
              {
                //Filters out labels which are point since points are listed in the last column anyway
                issue.labels.edges
                  .filter((label: any) => pointsExp.test(label.node.name) !== true)
                  .map((label: any) => {
                    return (
                      <Grid item key={label.node.name}>
                        <Label variant="small">{label.node.name}</Label>
                      </Grid>
                    );
                  })
              }
            </React.Fragment>
          )}
        </Grid>
        <Grid container direction="row" justify="flex-start" alignItems="flex-end" spacing={1}>
          <Grid item xs={12} sm container className={classes.issueSubTitle}>
            <span>
              <a href={issue.url} className={classes.issueSubTitle} target="_blank" rel="noopener noreferrer">
                #{issue.number}
              </a>
              &nbsp;
            </span>
            {issue.closedAt !== null ? (
              <span>Closed on {format(new Date(issue.closedAt), 'eee MMM d, yyyy')}</span>
            ) : (
              <span>Last updated on {format(new Date(issue.updatedAt), 'eee MMM d, yyyy')}</span>
            )}
          </Grid>
        </Grid>
      </div>{' '}
    </DataCard>
  );
};

export default PullRequest;
