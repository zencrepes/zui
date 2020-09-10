import React from 'react';
import XRegExp from 'xregexp';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid/Grid';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import { StateLabel, Label } from '@primer/components';

import { format } from 'date-fns';

import { Pullrequest } from '../../../../types/github/pullrequest';

interface Props {
  item: Pullrequest;
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

const getParticipants = (item: Pullrequest) => {
  let participants: Array<any> = [];
  if (item.assignees.totalCount > 0) {
    const assignees = item.assignees.edges.map((assignee) => {
      return {
        title:
          'Assignee: ' +
          (assignee.node.name === null || assignee.node.name === '' ? assignee.node.login : assignee.node.name),
        login: assignee.node.login,
        avatarUrl: assignee.node.avatarUrl,
        url: assignee.node.url,
      };
    });
    participants = [...participants, ...assignees];
  }
  if (item.reviewRequests.totalCount > 0) {
    const reviewRequests = item.reviewRequests.edges.map((rq: any) => {
      return {
        title: 'Requests: ' + rq.node.requestedReviewer.login,
        login: rq.node.requestedReviewer.login,
        avatarUrl: rq.node.requestedReviewer.avatarUrl,
        url: rq.node.requestedReviewer.url,
      };
    });
    participants = [...participants, ...reviewRequests];
  }
  if (item.reviews.totalCount > 0) {
    const reviews = item.reviews.edges.map((rq: any) => {
      return {
        title: 'Reviews: ' + rq.node.author.login,
        login: rq.node.author.login,
        avatarUrl: rq.node.author.avatarUrl,
        url: rq.node.author.url,
      };
    });
    participants = [...participants, ...reviews];
  }

  // Remove duplicates from array
  const uniqueParticipants: Array<any> = [];
  for (const participant of participants) {
    if (uniqueParticipants.find((p: any) => p.login === participant.login) === undefined) {
      uniqueParticipants.push(participant);
    }
  }
  return uniqueParticipants;
};

const PullrequestWide: React.FC<Props> = (props: Props) => {
  const { item } = props;
  const classes = useStyles();

  const participants = getParticipants(item);

  const pointsExp = XRegExp('SP:[.\\d]');
  return (
    <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
      <Grid item>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item>
            <Tooltip title={'Author: ' + item.author.login}>
              <Avatar alt={'Author: ' + item.author.login} src={item.author.avatarUrl} className={classes.avatar} />
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Tooltip title={item.state}>
          <React.Fragment>
            {item.state === 'OPEN' && <StateLabel status="pullOpened">Open</StateLabel>}
            {item.state === 'CLOSED' && <StateLabel status="pullClosed">Closed</StateLabel>}
            {item.state === 'MERGED' && <StateLabel status="pullMerged">Merged</StateLabel>}
          </React.Fragment>
        </Tooltip>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item>
            <a href={item.repository.url} className={classes.repoName} target="_blank" rel="noopener noreferrer">
              {item.repository.owner.login}/{item.repository.name}
            </a>
          </Grid>
          <Grid item xs={12} sm container>
            <a href={item.url} className={classes.pullrequestTitle} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item xs={12} sm container>
            {item.milestone !== null && (
              <Tooltip title="Pullrequest attached to milestone">
                <Chip
                  icon={<DirectionsRunIcon className={classes.iconSprint} />}
                  label={item.milestone.title}
                  className={classes.chipAgile}
                  color="primary"
                  variant="outlined"
                />
              </Tooltip>
            )}
          </Grid>
        </Grid>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item className={classes.pullrequestSubTitle}>
            <span>
              <a href={item.url} className={classes.pullrequestSubTitle} target="_blank" rel="noopener noreferrer">
                #{item.number}
              </a>{' '}
            </span>
            <span>opened on {format(new Date(item.createdAt), 'eee MMM d, yyyy')}</span>
            {item.author !== null && (
              <span>
                {' '}
                by{' '}
                <a href={item.author.url} className={classes.authorLink}>
                  #{item.author.login}
                </a>
              </span>
            )}
            {item.closedAt !== null ? (
              <span>, closed on {format(new Date(item.closedAt), 'eee MMM d, yyyy')}</span>
            ) : (
              <span>, last updated on {format(new Date(item.updatedAt), 'eee MMM d, yyyy')}</span>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {item.labels.totalCount > 0 && (
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
            {
              //Filters out labels which are point since points are listed in the last column anyway
              item.labels.edges
                .filter((label) => pointsExp.test(label.node.name) !== true)
                .map((label) => {
                  return (
                    <Grid item key={label.node.name}>
                      <Label variant="large" m={1} style={{ background: '#' + label.node.color }}>
                        {label.node.name}
                      </Label>
                    </Grid>
                  );
                })
            }
          </Grid>
        )}
      </Grid>
      <Grid item>
        {participants.length > 0 && (
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
            {participants.map((participant) => {
              return (
                <Grid item key={participant.login}>
                  <Tooltip title={participant.title}>
                    <Avatar alt={participant.title} src={participant.avatarUrl} className={classes.avatar} />
                  </Tooltip>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default PullrequestWide;
