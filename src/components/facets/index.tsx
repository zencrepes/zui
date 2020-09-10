import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import TermFacet from './term';
import MetricsFacet from './metrics';
import DateFacet from './date';
import BooleanFacet from './boolean';
import { Facet, FacetAggBucket, FacetAggMetrics } from '../../global';

import { addRemoveFromQuery, addRemoveMetricsFromQuery, addRemoveDateFromQuery } from '../../utils/query';

const useStyles = makeStyles(() => ({
  root: {
    width: '300px',
    marginTop: '0px',
  },
}));

interface Props {
  facets: Array<Facet>;
  defaultPoints: boolean;
  query: any;
  dataset: string;
  unit: string;
  gqlAggregationData: any;
  gqlMetricsFacet: any;
  pushNewQuery: (query: any) => void;
}

const Facets: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { facets, defaultPoints, query, dataset, gqlAggregationData, gqlMetricsFacet, unit, pushNewQuery } = props;

  const addRemoveFacet = (key: FacetAggBucket, facet: any) => {
    const modifiedQuery = addRemoveFromQuery(key.key, facet, query);
    pushNewQuery(modifiedQuery);
  };

  const addRemoveDateFilter = (selectedField: string, selectedOp: string, selectedDate: string) => {
    const modifiedQuery = addRemoveDateFromQuery(selectedField, selectedOp, selectedDate, query);
    pushNewQuery(modifiedQuery);
  };

  const addRemoveBooleanFilter = (key: FacetAggBucket, facet: any) => {
    const modifiedQuery = addRemoveFromQuery(key.key, facet, query, true);
    pushNewQuery(modifiedQuery);
  };

  const updateMetricsRange = (min: number, max: number, facet: any, metrics: FacetAggMetrics) => {
    // Only update the URL if one of the two value have changes
    if (metrics.min !== min || metrics.max !== max) {
      const modifiedQuery = addRemoveMetricsFromQuery(min, max, facet, query);
      pushNewQuery(modifiedQuery);
    }
  };

  // Date facets are always displayed first
  const dateFacetsfields = facets
    .filter((facet: any) => facet.facetType === 'date' && facet.default !== false)
    .map((facet: any) => facet.field);

  // Boolean facets are always displayed first
  const booleanFacetsfields = facets
    .filter((facet: any) => facet.facetType === 'boolean' && facet.default !== false)
    .map((facet: any) => facet.field);
  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="flex-start" alignItems="flex-start">
        {dateFacetsfields.length > 0 && (
          <Grid item key={'date'}>
            <DateFacet
              facets={facets.filter((facet: any) => facet.facetType === 'date')}
              addRemoveDateFilter={addRemoveDateFilter}
              query={query}
            />
          </Grid>
        )}
        {booleanFacetsfields.length > 0 && (
          <Grid item key={'boolean'}>
            <BooleanFacet
              facets={facets.filter((facet: any) => facet.facetType === 'boolean')}
              addRemoveBooleanFilter={addRemoveBooleanFilter}
              gqlAggregationData={gqlAggregationData}
              dataset={dataset}
              query={query}
            />
          </Grid>
        )}

        {facets
          .filter((f: Facet) => f.default === true)
          .map((facet: any) => {
            if (facet.facetType === 'term') {
              return (
                <Grid item key={facet.field}>
                  <TermFacet
                    facet={facet}
                    defaultPoints={defaultPoints}
                    addRemoveFacet={addRemoveFacet}
                    query={query}
                    gqlAggregationData={gqlAggregationData}
                    dataset={dataset}
                    unit={unit}
                  />
                </Grid>
              );
            } else if (facet.facetType === 'metrics') {
              return (
                <Grid item key={facet.field}>
                  <MetricsFacet
                    facet={facet}
                    defaultPoints={defaultPoints}
                    updateMetricsRange={updateMetricsRange}
                    query={query}
                    gqlMetricsFacet={gqlMetricsFacet}
                    dataset={dataset}
                  />
                </Grid>
              );
            }
            return null;
          })}
      </Grid>
    </div>
  );
};

export default Facets;
