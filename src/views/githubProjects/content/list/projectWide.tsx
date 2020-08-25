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
  issueTitle: {
    fontSize: '16px',
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

const getContrastYIQ = (hexcolor: string) => {
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
};

const IssueWide: React.FC<Props> = (props: Props) => {
  const { item } = props;
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
      <Grid item xs={12} sm container>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          {item.repository !== null ? (
            <Grid item>
              <a href={item.repository.url} className={classes.repoName} target="_blank" rel="noopener noreferrer">
                {item.repository.owner.login}/{item.repository.name}
              </a>
            </Grid>
          ) : (
            <Grid item>
              <a href={item.organization.url} className={classes.repoName} target="_blank" rel="noopener noreferrer">
                {item.organization.login}
              </a>
            </Grid>
          )}
          <Grid item xs={12} sm container>
            <a href={item.url} className={classes.issueTitle} target="_blank" rel="noopener noreferrer">
              {item.name}
            </a>
          </Grid>
        </Grid>
        {item.columns.totalCount > 0 && (
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={0}>
            {
              //Filters out labels which are point since points are listed in the last column anyway
              item.columns.edges.map((col: any) => {
                return (
                  <Grid item key={col.node.name}>
                    <Label
                      variant="small"
                      m={1}
                      style={{ background: '#123456', fontWeight: 400 }}
                      color={getContrastYIQ('#123456')}
                    >
                      {col.node.name} ({col.node.cards.totalCount})
                    </Label>
                  </Grid>
                );
              })
            }
          </Grid>
        )}
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item className={classes.issueSubTitle}>
            <span>
              <a href={item.url} className={classes.issueSubTitle} target="_blank" rel="noopener noreferrer">
                #{item.number}
              </a>{' '}
            </span>
            <span>created on {format(new Date(item.createdAt), 'eee MMM d, yyyy')}</span>
            {item.creator !== null && (
              <span>
                {' '}
                by{' '}
                <a href={item.creator.url} className={classes.authorLink}>
                  #{item.creator.login}
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
        <Tooltip title={item.state}>
          <React.Fragment>
            {item.state === 'OPEN' && <StateLabel status="issueOpened">Open</StateLabel>}
            {item.state === 'CLOSED' && <StateLabel status="issueClosed">Closed</StateLabel>}
          </React.Fragment>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Pending Cards">
          <Avatar className={classes.avatar}>{item.pendingCards.totalCount.toString()}</Avatar>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default IssueWide;
