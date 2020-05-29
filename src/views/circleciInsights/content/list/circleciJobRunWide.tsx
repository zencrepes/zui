import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import { StateLabel } from '@primer/components';

import { format } from 'date-fns';

interface Props {
  item: any;
}

const useStyles = makeStyles((theme) => ({
  repoName: {
    color: '#586069!important',
    fontSize: '16px',
    marginRight: '5px',
    textDecoration: 'none',
  },
  pullrequestTitle: {
    fontSize: '16px',
    color: '#000000!important',
    textDecoration: 'none',
  },
  authorLink: {
    textDecoration: 'none',
    fontSize: '12px',
    color: '#586069!important',
  },
  pullrequestSubTitle: {
    textDecoration: 'none',
    fontSize: '12px',
    color: '#586069!important',
  },
  avatar: {
    width: 35,
    height: 35,
  },
  avatarSmall: {
    width: 18,
    height: 18,
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
  pointsNa: {
    width: 35,
    height: 35,
    fontSize: 12,
  },
}));

const CircleciJobRunWide: React.FC<Props> = (props: Props) => {
  const { item } = props;
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
      <Grid item>
        <Tooltip title={item.status}>
          <React.Fragment>
            {item.status === 'success' ? (
              <StateLabel status="issueOpened">{item.status}</StateLabel>
            ) : (
              <StateLabel status="issueClosed">{item.status}</StateLabel>
            )}
          </React.Fragment>
        </Tooltip>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item>
            <a
              href={item.job.workflow.source.repository.owner.url}
              className={classes.repoName}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.job.workflow.source.repository.owner.login}
            </a>
            /{' '}
            <a
              href={item.job.workflow.source.repository.url}
              className={classes.repoName}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.job.workflow.source.repository.name}
            </a>
          </Grid>
          <Grid item xs={12} sm container>
            Job: {item.job.name}, Workflow: {item.job.workflow.name}
          </Grid>
        </Grid>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item className={classes.pullrequestSubTitle}>
            <span>
              Started on {format(new Date(item.started_at), 'eee MMM d, yyyy')}, lasted {item.duration} seconds and used{' '}
              {item.credits_used} credits
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CircleciJobRunWide;
