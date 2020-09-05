import React from 'react';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import { Facet } from '../../../global';

import Term from './term';
import Metrics from './metrics';
import DateQuery from './date';
import Advanced from './advanced';

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
  rootAnd: {
    marginLeft: '5px',
  },
  query: {
    flex: 1,
  },
}));

const DisplayQuery: React.FC<Props> = (props: Props) => {
  const { query, facets, removeFilter, replaceFilter } = props;
  const classes = useStyles();

  let cpt = 0;

  if (Object.keys(query).length > 0) {
    return (
      <div className={classes.root}>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          {query.content.map((filter: any) => {
            cpt = cpt + 1;
            const andparam = (
              <Grid item>
                <div className={classes.rootAnd}>
                  <Chip size="small" color="primary" label={'AND'} />
                </div>
              </Grid>
            );
            const facet = facets.find((f: Facet) => f.field === filter.content.field);
            if (facet !== undefined && (facet.facetType === 'term' || facet.facetType === 'boolean')) {
              return (
                <React.Fragment key={cpt + 'and'}>
                  <Grid item key={filter.tag !== undefined ? filter.content.field + filter.tag : filter.content.field}>
                    <Term filter={filter} facet={facet} removeFilter={removeFilter} replaceFilter={replaceFilter} />
                  </Grid>
                  {query.content.length !== cpt && <React.Fragment>{andparam}</React.Fragment>}
                </React.Fragment>
              );
            } else if (facet !== undefined && facet.facetType === 'metrics') {
              return (
                <React.Fragment key={cpt + 'and'}>
                  <Grid item key={filter.content.field + filter.op}>
                    <Metrics filter={filter} facet={facet} removeFilter={removeFilter} />
                  </Grid>
                  {query.content.length !== cpt && <React.Fragment>{andparam}</React.Fragment>}
                </React.Fragment>
              );
            } else if (facet !== undefined && facet.facetType === 'date') {
              return (
                <React.Fragment key={cpt + 'and'}>
                  <Grid item key={filter.content.field + filter.op}>
                    <DateQuery filter={filter} facet={facet} removeFilter={removeFilter} />
                  </Grid>
                  {query.content.length !== cpt && <React.Fragment>{andparam}</React.Fragment>}
                </React.Fragment>
              );
            } else if (facet === undefined && filter.content.length > 0) {
              return (
                <React.Fragment key={cpt + 'and'}>
                  <Grid item key={filter.content[0].op + filter.content[0].content.field}>
                    <Advanced filter={filter} removeFilter={null} replaceFilter={null} />
                  </Grid>
                  {query.content.length !== cpt && <React.Fragment>{andparam}</React.Fragment>}
                </React.Fragment>
              );
            }
            const emptyFacet = facets.find((f: Facet) => f.nullFilter === JSON.stringify(filter));
            if (emptyFacet !== undefined && (emptyFacet.facetType === 'term' || emptyFacet.facetType === 'boolean')) {
              return (
                <React.Fragment key={cpt + 'and'}>
                  <Grid item key={filter.content.field}>
                    <Term
                      filter={filter}
                      facet={emptyFacet}
                      removeFilter={removeFilter}
                      replaceFilter={replaceFilter}
                    />
                  </Grid>
                  {query.content.length !== cpt && <React.Fragment>{andparam}</React.Fragment>}
                </React.Fragment>
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
