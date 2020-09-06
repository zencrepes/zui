import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Grid from '@material-ui/core/Grid';

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

type Props = {
  node: any;
};

const Partial: React.FC<Props> = (props: Props) => {
  const { node } = props;
  const classes = useStyles();

  return (
    <DataCard title={node.typename} subtitle="Node not present in local database">
      <div className={classes.root}>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item xs={12} sm container>
            <a href={node.url} className={classes.issueTitle} target="_blank" rel="noopener noreferrer">
              {node.title}
            </a>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="flex-start" alignItems="flex-end" spacing={1}>
          <Grid item xs={12} sm container className={classes.issueSubTitle}>
            <span>
              <a href={node.url} className={classes.issueSubTitle} target="_blank" rel="noopener noreferrer">
                #{node.number} {node.url}
              </a>
              &nbsp;
            </span>
          </Grid>
        </Grid>
      </div>
    </DataCard>
  );
};

export default Partial;
