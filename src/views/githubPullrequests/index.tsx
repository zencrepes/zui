import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Layout from '../../layout';
import { Dataset } from '../../global';
import NavTabs from './navTabs';

import Content from './content';
import Facets from './facets';

interface Props {
  datasets?: Dataset[];
  currentDatasetKey?: string;
}

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: '100%',
  },
}));

const Data: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Layout {...props}>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start">
        <Grid item>
          <Facets />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid container direction="column" justify="flex-start" alignItems="flex-start">
            <Grid item xs={12} sm className={classes.fullWidth}>
              <span>Query Box</span>
            </Grid>
            <Grid item xs={12} sm className={classes.fullWidth}>
              <NavTabs />
            </Grid>
            <Grid item xs={12} sm className={classes.fullWidth}>
              <Content />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Data;