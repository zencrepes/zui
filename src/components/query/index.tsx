import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { removeFilterFromQuery } from '../../utils/query';

import OpenButton from './openButton';
import ClearButton from './clearButton';
import SaveButton from './saveButton';

import DisplayRawQuery from './displayRawQuery';
import DisplayQuery from './displayQuery/index';
import ManageQueries from './manageQueries';
import SaveQuery from './saveQuery';

import { Facet, SavedQuery } from '../../global';

interface QueryHandlingType {
  query: any;
  facets: Array<Facet>;
  dexieDb: any;
  dataset: any;
  setQueries: Function;
  queries: Array<any>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px',
    border: `1px solid ${theme.palette.divider}`,
  },
  query: {
    flex: 1,
  },
}));

type connectedProps = RouteComponentProps & QueryHandlingType;

const QueryHandling: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { query, history, facets, dexieDb, dataset, setQueries, queries } = props;
  const [openSaveQueryDialog, setStateOpenSaveQueryDialog] = React.useState(false);
  const [openManageQueryDialog, setStateOpenManageQueryDialog] = React.useState(false);

  const setOpenSaveQueryDialog = () => {
    setStateOpenSaveQueryDialog(true);
  };

  const setOpenManageQueryDialog = () => {
    setStateOpenManageQueryDialog(true);
  };

  const openQuery = (newQuery: any) => {
    if (JSON.stringify(query) !== JSON.stringify(newQuery)) {
      history.push({
        pathname: '/' + dataset,
        search: '?q=' + encodeURIComponent(JSON.stringify(newQuery)),
        state: { detail: newQuery },
      });
    }
  };

  const clearQuery = () => {
    openQuery({});
  };

  const removeFilter = (filter: any) => {
    const updatedQuery = removeFilterFromQuery(filter, query);
    openQuery(updatedQuery);
  };

  const replaceFilter = (filter: any) => {
    const updatedQuery = {
      ...query,
      content: query.content.map((f: any) => {
        if (f.field === filter.field) {
          return filter;
        } else {
          return f;
        }
      }),
    };
    openQuery(updatedQuery);
  };

  const loadQuery = (query: SavedQuery) => {
    openQuery(query.query);
    setStateOpenManageQueryDialog(false);
  };

  const saveQuery = async (queryName: string) => {
    await dexieDb.queries.add({ name: queryName, dataset, query });
    const updatedQueries = await dexieDb.queries.where('dataset').equals(dataset).toArray();
    setQueries(updatedQueries);
    setStateOpenSaveQueryDialog(false);
  };

  const deleteQuery = async (query: SavedQuery) => {
    await dexieDb.queries.where('id').equals(query.id).delete();
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
      .then((results: any) => {
        if (queries.length !== results.length) {
          setQueries(results);
        }
      });
  }

  const availableQueries: Array<SavedQuery> = queries;
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
          <DisplayQuery query={query} facets={facets} removeFilter={removeFilter} replaceFilter={replaceFilter} />
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

export default withRouter(QueryHandling);
