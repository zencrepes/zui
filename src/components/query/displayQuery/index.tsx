import React from 'react';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

import { Facet } from '../../../global';

import Term from './term';
import Metrics from './metrics';
import DateQuery from './date';

interface Props {
  query: any;
  removeFilter: Function | null;
  replaceFilter: Function | null;
  facets: Array<Facet>;
}

const useStyles = makeStyles(() => ({
  root: {
    margin: '10px',
  },
  query: {
    flex: 1,
  },
}));

const DisplayQuery: React.FC<Props> = (props: Props) => {
  const { query, facets, removeFilter, replaceFilter } = props;
  const classes = useStyles();

  if (Object.keys(query).length > 0) {
    return (
      <div className={classes.root}>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          {query.content.map((filter: any) => {
            const facet = facets.find((f: Facet) => f.field === filter.content.field);
            if (facet !== undefined && (facet.facetType === 'term' || facet.facetType === 'boolean')) {
              return (
                <Grid item key={filter.tag !== undefined ? filter.content.field + filter.tag : filter.content.field}>
                  <Term filter={filter} facet={facet} removeFilter={removeFilter} replaceFilter={replaceFilter} />
                </Grid>
              );
            } else if (facet !== undefined && facet.facetType === 'metrics') {
              return (
                <Grid item key={filter.content.field + filter.op}>
                  <Metrics filter={filter} facet={facet} removeFilter={removeFilter} />
                </Grid>
              );
            } else if (facet !== undefined && facet.facetType === 'date') {
              return (
                <Grid item key={filter.content.field + filter.op}>
                  <DateQuery filter={filter} facet={facet} removeFilter={removeFilter} />
                </Grid>
              );
            }
            const emptyFacet = facets.find((f: Facet) => f.nullFilter === JSON.stringify(filter));
            if (emptyFacet !== undefined && (emptyFacet.facetType === 'term' || emptyFacet.facetType === 'boolean')) {
              return (
                <Grid item key={filter.content.field}>
                  <Term filter={filter} facet={emptyFacet} removeFilter={removeFilter} replaceFilter={replaceFilter} />
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
