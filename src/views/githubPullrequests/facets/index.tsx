import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { iRootState } from '../../../store';

import TermFacet from './term';

const mapState = (state: iRootState) => ({
  facets: state.githubPullrequests.facets,
  defaultPoints: state.githubPullrequests.defaultPoints,
});

const mapDispatch = (dispatch: any) => ({});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '250px',
    marginTop: '10px',
  },
}));

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Facets: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { facets, defaultPoints } = props;

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="flex-start" alignItems="flex-start">
        {facets.map((facet: any) => {
          if (facet.type === 'term') {
            return (
              <Grid item key={facet.field}>
                <TermFacet facet={facet} defaultPoints={defaultPoints} />
              </Grid>
            );
          } else if (facet.type === 'date') {
            return (
              <Grid item key={facet.field}>
                <div>Date Facet</div>
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
    </div>
  );
};

export default connect(mapState, mapDispatch)(Facets);
