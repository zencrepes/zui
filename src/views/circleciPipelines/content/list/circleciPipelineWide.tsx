import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid/Grid';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';

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

const JiraIssueWide: React.FC<Props> = (props: Props) => {
  const { item } = props;
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
      <Grid item>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item>
            {item.trigger.actor.login !== 'Scheduled' ? (
              <Tooltip title={'Reporter: ' + item.trigger.actor.login}>
                <Avatar
                  alt={'Reporter: ' + item.trigger.actor.login}
                  src={item.trigger.actor.avatar_url}
                  className={classes.avatar}
                />
              </Tooltip>
            ) : (
              <Tooltip title={'Scheduled trigger'}>
                <Avatar>
                  <AlarmOnIcon />
                </Avatar>
              </Tooltip>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Tooltip title={item.state}>
          <React.Fragment>
            {item.state === 'errored' ? (
              <StateLabel status="issueClosed">{item.state}</StateLabel>
            ) : (
              <StateLabel status="issueOpened">{item.state}</StateLabel>
            )}
          </React.Fragment>
        </Tooltip>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item>
            <a
              href={item.source.repository.owner.url}
              className={classes.repoName}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.source.repository.owner.login}
            </a>
            /
            <a href={item.source.repository.url} className={classes.repoName} target="_blank" rel="noopener noreferrer">
              {item.source.repository.name}
            </a>
          </Grid>
          <Grid item xs={12} sm container>
            <a
              href={item.source.repository.url}
              className={classes.pullrequestTitle}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.vcs.commit !== null ? item.vcs.commit.subject : 'Commit message not available'}
            </a>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item className={classes.pullrequestSubTitle}>
            <span>Triggered on {format(new Date(item.triggeredAt), 'eee MMM d, yyyy')}</span>
            {item.trigger.actor.login !== null && <span> by {item.trigger.actor.login}</span>}
            {item.vcs.branch !== null && (
              <span>
                , commit{' '}
                <a
                  href={item.source.repository.url + '/commit/' + item.vcs.revision}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.vcs.revision.slice(0, 7)}
                </a>{' '}
                on branch: {item.vcs.branch}
              </span>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <a
          href={
            'https://app.circleci.com/pipelines/github/' +
            item.source.repository.owner.login +
            '/' +
            item.source.repository.name +
            '?branch=' +
            item.vcs.branch
          }
          className={classes.repoName}
          target="_blank"
          rel="noopener noreferrer"
        >
          # {item.number}
        </a>
      </Grid>
    </Grid>
  );
};

export default JiraIssueWide;
