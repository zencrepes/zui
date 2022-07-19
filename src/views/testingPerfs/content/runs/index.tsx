import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import AvailableRuns from './data/availableRuns';
import SingleRunData from './data/singleRunData';
import CompareRuns from './data/compareRuns';

import NavTabs from './navTabs';
import Toolbar from './toolbar';
import Content from './content';
import Loading from './loading';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px',
    border: `1px solid rgba(0, 0, 0, 0.12)`,
  },
  fullWidth: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Runs: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AvailableRuns />
      <SingleRunData />
      <CompareRuns />
      <AppBar position="static" color="default">
        <Toolbar />
        <NavTabs />
      </AppBar>
      <Loading />
      <Content />
    </div>
  );
};

export default Runs;
