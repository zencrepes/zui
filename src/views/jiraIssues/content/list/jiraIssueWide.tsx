import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid/Grid';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import { StateLabel, Label } from '@primer/components';

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

  let points = null;
  if (item.originalPoints !== null) {
    points = item.originalPoints;
  }
  if (item.points !== null) {
    points = item.points;
  }

  return (
    <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
      <Grid item>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item>
            <Tooltip title={'Reporter: ' + item.reporter.name}>
              <Avatar
                alt={'Reporter: ' + item.reporter.name}
                src={item.reporter.avatarUrls.medium}
                className={classes.avatar}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Tooltip title={item.status.statusCategory.name}>
          <React.Fragment>
            {item.status.statusCategory.key === 'done' ? (
              <StateLabel status="issueClosed">CLOSED</StateLabel>
            ) : (
              <StateLabel status="issueOpened">OPEN</StateLabel>
            )}
          </React.Fragment>
        </Tooltip>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item>
            <Tooltip title={item.type.name}>
              <Avatar alt={item.type.name} src={item.type.iconUrl} className={classes.avatarSmall} />
            </Tooltip>
          </Grid>
          <Grid item>
            <a
              href={item.server.host + '/browse/' + item.key}
              className={classes.repoName}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.server.name}/{item.project.name}
            </a>
          </Grid>
          <Grid item xs={12} sm container>
            <a
              href={item.server.host + '/browse/' + item.key}
              className={classes.pullrequestTitle}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.summary}
            </a>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item className={classes.pullrequestSubTitle}>
            <span>
              <a
                href={item.server.host + '/browse/' + item.key}
                className={classes.pullrequestSubTitle}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.key}
              </a>{' '}
            </span>
            <span>opened on {format(new Date(item.createdAt), 'eee MMM d, yyyy')}</span>
            {item.reporter !== null && <span> by {item.reporter.name}</span>}
            {item.closedAt !== null ? (
              <span>, closed on {format(new Date(item.closedAt), 'eee MMM d, yyyy')}</span>
            ) : (
              <span>, last updated on {format(new Date(item.updatedAt), 'eee MMM d, yyyy')}</span>
            )}
            {item.resolution !== null && item.resolution.name !== 'Done' && (
              <Label variant="small" bg="#A575FF" m={1}>
                {item.resolution.name}
              </Label>
            )}
            {item.status.statusCategory.key !== 'done' && item.status.name !== 'Open' && (
              <Label variant="small" bg="#1C90FA" m={1}>
                {item.status.name}
              </Label>
            )}
            {item.fixVersions.edges.map((fv: any) => {
              return (
                <Tooltip title="FixVersion" key={fv.node.id}>
                  <Label variant="small" bg="#A500FF" m={1}>
                    {'fv:' + fv.node.name}
                  </Label>
                </Tooltip>
              );
            })}
            {item.versions.edges.map((fv: any) => {
              return (
                <Tooltip title="Version" key={fv.node.id}>
                  <Label variant="small" bg="#EE00FF" m={1}>
                    {'v:' + fv.node.name}
                  </Label>
                </Tooltip>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item>
            {item.assignee !== null && (
              <Tooltip title={'Assignee: ' + item.assignee.name}>
                <Avatar
                  alt={'Assignee: ' + item.assignee.name}
                  src={item.assignee.avatarUrls.medium}
                  className={classes.avatar}
                />
              </Tooltip>
            )}
          </Grid>
          <Grid item>
            {points !== null ? (
              <Tooltip title={'Points: ' + points}>
                <Avatar alt={'Points: ' + points} className={classes.avatar}>
                  {points}
                </Avatar>
              </Tooltip>
            ) : (
              <Tooltip title={'No points attached'}>
                <Avatar alt={'No points attached'} className={classes.pointsNa}>
                  n/a
                </Avatar>
              </Tooltip>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default JiraIssueWide;
