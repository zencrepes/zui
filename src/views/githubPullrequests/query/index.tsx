import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { iRootState } from '../../../store';

import { addRemoveFromQuery, addRemoveMetricsFromQuery, addRemoveDateFromQuery } from '../../../utils/query';

import OpenButton from './openButton';
import ClearButton from './clearButton';
import SaveButton from './saveButton';

import DisplayRawQuery from './displayRawQuery';
import DisplayQuery from './displayQuery/index';
import ManageQueries from './manageQueries';
import SaveQuery from './saveQuery';

import { Facet, Query } from './types';

const mapState = (state: iRootState) => ({
  query: state.githubPullrequests.query,
  dataset: state.githubPullrequests.dataset,
  queries: state.githubPullrequests.queries,
  dexieDb: state.global.dexieDb,
});

const mapDispatch = (dispatch: any) => ({
  saveQuery: dispatch.githubPullrequests.saveQuery,
  deleteQuery: dispatch.githubPullrequests.deleteQuery,
  updateQuery: dispatch.githubPullrequests.updateQuery,
  setSelectedTab: dispatch.githubPullrequests.setSelectedTab,
  setQueries: dispatch.githubPullrequests.setQueries,
  setQuery: dispatch.githubPullrequests.setQuery,
});

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px',
    border: `1px solid ${theme.palette.divider}`,
  },
  query: {
    flex: 1,
  },
}));

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps & { facets: Array<Facet> };

const QueryHandling: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const {
    query,
    updateQuery,
    location,
    history,
    setSelectedTab,
    facets,
    dexieDb,
    dataset,
    setQueries,
    queries,
  } = props;
  const [openSaveQueryDialog, setStateOpenSaveQueryDialog] = React.useState(false);
  const [openManageQueryDialog, setStateOpenManageQueryDialog] = React.useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('q') !== null) {
      const queryRaw = params.get('q');
      if (queryRaw !== null) {
        const queryUrl = decodeURIComponent(queryRaw);
        // We only update the store if the query is different than store
        // We might need to replace stringify by Lodash isEqual
        if (JSON.stringify(query) !== JSON.stringify(JSON.parse(queryUrl))) {
          updateQuery(JSON.parse(queryUrl));
        }
      }
    }
    //else {
    //   if (JSON.stringify(query) !== JSON.stringify(query)) {
    //     updateQuery({});
    //   }
    // }
    if (params.get('tab') !== undefined && params.get('tab') !== null) {
      setSelectedTab(params.get('tab'));
    }
  });

  const setOpenSaveQueryDialog = () => {
    console.log('click Open Save');
    setStateOpenSaveQueryDialog(true);
  };

  const setOpenManageQueryDialog = () => {
    console.log('click Open Manager');
    setStateOpenManageQueryDialog(true);
  };

  const clearQuery = () => {
    console.log('clear query');
    history.push({
      pathname: '/githubPullrequests',
      search: '?q=' + encodeURIComponent('{}'),
      state: { detail: null },
    });
  };

  const updateViewQuery = (value: string, facet: Facet, op?: string) => {
    console.log('Update query');
    console.log('Close: ' + value + ' from: ' + facet.field);

    let updatedQuery = {};
    if (facet.facetType === 'term') {
      updatedQuery = addRemoveFromQuery(value, facet, query);
    } else if (facet.facetType === 'metrics') {
      updatedQuery = addRemoveMetricsFromQuery(null, null, facet, query);
    } else if (facet.facetType === 'date' && op !== undefined) {
      updatedQuery = addRemoveDateFromQuery(facet.field, op, value, query);
    }
    history.push({
      pathname: '/githubPullrequests',
      search: '?q=' + encodeURIComponent(JSON.stringify(updatedQuery)),
      state: { detail: updatedQuery },
    });
  };

  const loadQuery = (query: Query) => {
    console.log('Query index - loadQuery()');
    console.log(query);
    history.push({
      pathname: '/githubPullrequests',
      search: '?q=' + encodeURIComponent(JSON.stringify(query.query)),
      state: { detail: JSON.stringify(query.query) },
    });
    setStateOpenManageQueryDialog(false);
  };

  const saveQuery = async (queryName: string) => {
    await dexieDb.queries.add({ name: queryName, dataset, query });
    console.log('Saved current query under name: ' + queryName);
    const updatedQueries = await dexieDb.queries.where('dataset').equals(dataset).toArray();
    setQueries(updatedQueries);
    setStateOpenSaveQueryDialog(false);
  };

  const deleteQuery = async (query: Query) => {
    await dexieDb.queries.where('id').equals(query.id).delete();
    console.log('Deleted query: ' + query.name);
    const updatedQueries = await dexieDb.queries.where('dataset').equals(dataset).toArray();
    setQueries(updatedQueries);
    setStateOpenManageQueryDialog(false);
  };

  // In case queries equal 0, we check for anything in indexedDB
  if (queries.length === 0) {
    dexieDb.queries
      .where('dataset')
      .equals(dataset)
      .toArray()
      .then((results) => {
        if (queries.length !== results.length) {
          setQueries(results);
        }
      });
  }

  const availableQueries: Array<Query> = queries;
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
        {queries.length > 0 && (
          <Grid item>
            <OpenButton onClick={setOpenManageQueryDialog} />
            <ManageQueries
              openManageQueryDialog={openManageQueryDialog}
              setStateOpenManageQueryDialog={setStateOpenManageQueryDialog}
              facets={facets}
              loadQuery={loadQuery}
              deleteQuery={deleteQuery}
              queries={queries}
            />
          </Grid>
        )}
        {availableQueries.filter((currentQuery) => JSON.stringify(currentQuery.query) === JSON.stringify(query))
          .length === 0 && (
          <Grid item>
            {Object.keys(query).length > 0 && <SaveButton onClick={setOpenSaveQueryDialog} />}
            <SaveQuery
              queries={queries}
              saveQuery={saveQuery}
              openSaveQueryDialog={openSaveQueryDialog}
              setStateOpenSaveQueryDialog={setStateOpenSaveQueryDialog}
            />
          </Grid>
        )}
        <Grid item xs={12} sm container>
          <DisplayQuery query={query} facets={facets} updateQuery={updateViewQuery} />
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={0}>
            {Object.keys(query).length > 0 && (
              <Grid item>
                <ClearButton onClick={clearQuery} />
              </Grid>
            )}
            <Grid item>
              <DisplayRawQuery query={query} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(connect(mapState, mapDispatch)(QueryHandling));
