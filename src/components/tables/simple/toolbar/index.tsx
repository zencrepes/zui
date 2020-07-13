import React from 'react';

import { makeStyles, lighten, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { TableConfig } from '../../../../global';

interface Props {
  exportTsv: any;
  actions: any;
  totalCount: number;
  tableConfig: TableConfig;
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

  const { exportTsv, actions, totalCount, tableConfig } = props;
  return (
    <Toolbar className={classes.root}>
      <Grid container direction="row" justify="flex-start" alignItems="center" spacing={3}>
        <Grid item>
          <Typography variant="subtitle1">
            {totalCount} {tableConfig.itemsType}
          </Typography>
        </Grid>
        <Grid item xs={12} sm container></Grid>
        <Grid item>{actions}</Grid>
        <Grid item>{exportTsv}</Grid>
      </Grid>
    </Toolbar>
  );
};

export default TableToolbar;
