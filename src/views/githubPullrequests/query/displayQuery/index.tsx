import React from 'react';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

import { Facet } from '../types';

import Term from './term';
import Metrics from './metrics';
import DateQuery from './date';

interface Props {
  query: any;
  updateQuery: Function | null;
  facets: Array<Facet>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px',
  },
  query: {
    flex: 1,
  },
}));

const DisplayQuery: React.FC<Props> = (props: Props) => {
  const { query, facets, updateQuery } = props;
  const classes = useStyles();
  if (Object.keys(query).length > 0) {
    return (
      <div className={classes.root}>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          {query.content.map((content: any) => {
            const facet = facets.find((f: Facet) => f.field === content.content.field);
            if (facet !== undefined && facet.facetType === 'term') {
              return (
                <Grid item key={content.content.field}>
                  <Term values={content.content.value} facet={facet} updateQuery={updateQuery} />
                </Grid>
              );
            } else if (facet !== undefined && facet.facetType === 'metrics') {
              return (
                <Grid item key={content.content.field + content.op}>
                  <Metrics op={content.op} value={content.content.value} facet={facet} updateQuery={updateQuery} />
                </Grid>
              );
            } else if (facet !== undefined && facet.facetType === 'date') {
              return (
                <Grid item key={content.content.field + content.op}>
                  <DateQuery op={content.op} value={content.content.value} facet={facet} updateQuery={updateQuery} />
                </Grid>
              );
            }
            return null;
          })}
        </Grid>
      </div>
    );
  }
  return null;
};

export default DisplayQuery;
