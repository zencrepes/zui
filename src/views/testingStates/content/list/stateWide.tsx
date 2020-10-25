import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Chip from '@material-ui/core/Chip';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import addSeconds from 'date-fns/addSeconds';
import formatDistance from 'date-fns/formatDistance';
import { format } from 'date-fns';

import randomColor from 'randomcolor';

import { Label } from '@primer/components';

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

const formatDuration = (duration: number) => {
  const start = new Date(0);
  const end = addSeconds(new Date(0), duration);
  return formatDistance(start, end);
};

const StateWide: React.FC<Props> = (props: Props) => {
  const { item } = props;
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
      <Grid item xs={12} sm container>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item xs={12} sm container>
            <a href={item.url} className={classes.issueTitle} target="_blank" rel="noopener noreferrer">
              {item.name} {item.version}
            </a>
          </Grid>
        </Grid>
        {item.dependencies.totalCount > 0 && (
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={0}>
            {
              //Filters out labels which are point since points are listed in the last column anyway
              item.dependencies.edges.map((d: any) => {
                const bgColor = randomColor({
                  luminosity: 'dark',
                  format: 'rgb', // e.g. 'rgb(225,200,20)'
                  seed: d.node.name,
                });
                return (
                  <Grid item key={d.node.name}>
                    <Label
                      variant="small"
                      m={1}
                      style={{ background: bgColor, fontWeight: 400 }}
                      color={getContrastYIQ(bgColor)}
                    >
                      {d.node.url !== null ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          {d.node.name} ({d.node.version})
                        </a>
                      ) : (
                        <React.Fragment>
                          {d.node.name} ({d.node.version})
                        </React.Fragment>
                      )}
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
              On {format(new Date(item.createdAt), 'eee MMM d, yyyy')} at {format(new Date(item.createdAt), 'HH:MM')},
              executed {item.runTotal} tests in {formatDuration(item.runDuration)}, {item.runFailure} failure(s)
            </span>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {item.state === 'FAIL' ? (
          <Chip
            icon={<ClearIcon />}
            style={{ backgroundColor: 'red' }}
            label={'FAIL (' + item.runFailure + ')'}
            color="primary"
          />
        ) : (
          <Chip icon={<CheckIcon />} style={{ backgroundColor: 'green' }} label={item.state} color="primary" />
        )}
      </Grid>
    </Grid>
  );
};

export default StateWide;
