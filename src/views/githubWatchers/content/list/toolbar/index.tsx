import React from 'react';

import { makeStyles, lighten, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ExportButton from './exportButton';

interface Props {
  totalCount: number;
  query: any;
  sortField: string;
  sortDirection: 'desc' | 'asc';
  tableColumns: any[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
}));

const TableToolbar: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const { totalCount, query, sortField, sortDirection, tableColumns } = props;
  return (
    <Toolbar className={classes.root}>
      <Grid container direction="row" justify="flex-start" alignItems="center" spacing={3}>
        <Grid item>
          <Typography variant="subtitle1">{totalCount} Watchers</Typography>
        </Grid>
        <Grid item xs={12} sm container></Grid>
        <Grid item>
          <ExportButton
            query={query}
            totalCount={totalCount}
            sortField={sortField}
            sortDirection={sortDirection}
            tableColumns={tableColumns}
          />
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default TableToolbar;
