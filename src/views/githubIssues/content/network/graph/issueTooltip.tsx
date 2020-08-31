import React from 'react';
import XRegExp from 'xregexp';

import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import { Grid, Box, Label, LabelGroup, Avatar } from '@primer/components';

import { format } from 'date-fns';

interface Props {
  issue: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '260px',
    width: '100%',
    padding: '5px',
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

/*
Note: Using material-ui when using ReactDOMServer.renderToString results in the following error:
---
Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. 
This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. 
To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. 
See https://fb.me/react-uselayouteffect-ssr for common fixes.
---
Using primer only for this component
*/

const IssueWide: React.FC<Props> = (props: Props) => {
  const { issue } = props;
  const classes = useStyles();

  const pointsExp = XRegExp('SP:[.\\d]');

  console.log(issue);

  if (issue.partial === true) {
    return (
      <div className={classes.root}>
        <div>
          <a href={issue.url} className={classes.issueTitle} target="_blank" rel="noopener noreferrer">
            {issue.title}
          </a>
        </div>
        <div>
          <span>
            <a href={issue.url} className={classes.issueSubTitle} target="_blank" rel="noopener noreferrer">
              {issue.url}
            </a>
            &nbsp;
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <Grid gridTemplateColumns="repeat(2, auto)" gridGap={1}>
        <Box p={3}>
          <a href={issue.repository.url} className={classes.repoName} target="_blank" rel="noopener noreferrer">
            {issue.repository.owner.login}/{issue.repository.name}
          </a>
        </Box>
        <Box p={3}>
          {issue.assignees.totalCount > 0 && (
            <React.Fragment>
              {issue.assignees.edges.map((assignee: any) => {
                return <Avatar key={assignee.node.login} src={assignee.node.avatarUrl} />;
              })}
            </React.Fragment>
          )}
        </Box>
      </Grid>
      <div>
        <a href={issue.url} className={classes.issueTitle} target="_blank" rel="noopener noreferrer">
          {issue.title}
        </a>
      </div>
      <div>
        {issue.labels.totalCount > 0 && (
          <LabelGroup>
            {
              //Filters out labels which are point since points are listed in the last column anyway
              issue.labels.edges
                .filter((label: any) => pointsExp.test(label.node.name) !== true)
                .map((label: any) => {
                  return (
                    <Label variant="small" key={label.node.name}>
                      {label.node.name}
                    </Label>
                  );
                })
            }
          </LabelGroup>
        )}
      </div>
      <div>
        <span>
          <a href={issue.url} className={classes.issueSubTitle} target="_blank" rel="noopener noreferrer">
            #{issue.number}
          </a>
          &nbsp;
        </span>
        {issue.closedAt !== null ? (
          <span className={classes.issueSubTitle}>Closed on {format(new Date(issue.closedAt), 'eee MMM d, yyyy')}</span>
        ) : (
          <span className={classes.issueSubTitle}>
            Last updated on {format(new Date(issue.updatedAt), 'eee MMM d, yyyy')}
          </span>
        )}
        {issue.points !== null && <span className={classes.issueSubTitle}>, points:{issue.points}</span>}
      </div>
    </div>
  );
  /*
  if (issue.partial === true) {
    return (
      <div className={classes.root}>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item xs={12} sm container>
            <span>GitHub Issue not in your local database !</span>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item xs={12} sm container>
            <a href={issue.url} className={classes.issueTitle} target="_blank" rel="noopener noreferrer">
              {issue.title}
            </a>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="flex-start" alignItems="flex-end" spacing={1}>
          <Grid item xs={12} sm container className={classes.issueSubTitle}>
            <span>
              <a href={issue.url} className={classes.issueSubTitle} target="_blank" rel="noopener noreferrer">
                #{issue.number}
              </a>
              &nbsp;
            </span>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return (
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
          <Grid item>
            <CounterLabel>{issue.points}</CounterLabel>
          </Grid>
        </Grid>
      </div>
    );
  }
  */
  /*  
  return (
    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
      {selectable && (
        <Grid item>
          <SelectIssue issue={item} />
        </Grid>
      )}
      <Grid item>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item>
            <Tooltip title={'Author: ' + issue.author.login}>
              <Avatar alt={'Author: ' + issue.author.login} src={issue.author.avatarUrl} className={classes.avatar} />
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Tooltip title={issue.state}>
          <React.Fragment>
            {issue.state === 'OPEN' && <StateLabel status="issueOpened">Open</StateLabel>}
            {issue.state === 'CLOSED' && <StateLabel status="issueClosed">Closed</StateLabel>}
          </React.Fragment>
        </Tooltip>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item>
            <a href={issue.repository.url} className={classes.repoName} target="_blank" rel="noopener noreferrer">
              {issue.repository.owner.login}/{issue.repository.name}
            </a>
          </Grid>
          <Grid item xs={12} sm container>
            <a href={issue.url} className={classes.issueTitle} target="_blank" rel="noopener noreferrer">
              {issue.title}
            </a>
          </Grid>
        </Grid>
        {issue.labels.totalCount > 0 && (
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={0}>
            {
              //Filters out labels which are point since points are listed in the last column anyway
              issue.labels.edges
                .filter((label) => pointsExp.test(label.node.name) !== true)
                .map((label) => {
                  return (
                    <Grid item key={label.node.name}>
                      <Label
                        variant="small"
                        m={1}
                        style={{ background: '#' + label.node.color, fontWeight: 400 }}
                        color={getContrastYIQ(label.node.color)}
                      >
                        {label.node.name}
                      </Label>
                    </Grid>
                  );
                })
            }
          </Grid>
        )}
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          {issue.milestone !== null && (
            <Grid item>
              <Tooltip title="Issue attached to milestone">
                <Chip
                  icon={<DirectionsRunIcon className={classes.iconSprint} />}
                  label={issue.milestone.title}
                  className={classes.chipAgile}
                  color="primary"
                  variant="outlined"
                />
              </Tooltip>
            </Grid>
          )}
          {issue.projectCards.edges.map((projectCard) => {
            return (
              <Grid item key={projectCard.node.id}>
                <Tooltip title="Issue attached to a project">
                  <Chip
                    icon={<AccountTreeIcon className={classes.iconSprint} />}
                    label={projectCard.node.project.name}
                    className={classes.chipAgile}
                    color="primary"
                    variant="outlined"
                  />
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item className={classes.issueSubTitle}>
            <span>
              <a href={issue.url} className={classes.issueSubTitle} target="_blank" rel="noopener noreferrer">
                #{issue.number}
              </a>{' '}
            </span>
            <span>opened on {format(new Date(issue.createdAt), 'eee MMM d, yyyy')}</span>
            {issue.author !== null && (
              <span>
                {' '}
                by{' '}
                <a href={issue.author.url} className={classes.authorLink}>
                  #{issue.author.login}
                </a>
              </span>
            )}
            {issue.closedAt !== null ? (
              <span>, closed on {format(new Date(issue.closedAt), 'eee MMM d, yyyy')}</span>
            ) : (
              <span>, last updated on {format(new Date(issue.updatedAt), 'eee MMM d, yyyy')}</span>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {issue.assignees.totalCount > 0 && (
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
            {issue.assignees.edges.map((assignee) => {
              return (
                <Grid item key={assignee.node.login}>
                  <Tooltip title={assignee.node.login}>
                    <Avatar alt={assignee.node.login} src={assignee.node.avatarUrl} className={classes.avatar} />
                  </Tooltip>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>
      <Grid item>
        <Tooltip title="Story Points">
          <Avatar className={classes.avatar}>{issue.points !== null ? issue.points.toString() : ''}</Avatar>
        </Tooltip>
      </Grid>
    </Grid>
  );
  */
};

export default IssueWide;
