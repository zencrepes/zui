import React from 'react';

import Grid from '@material-ui/core/Grid';

import { TableConfig, TableSort } from '../../../../../global';

import SelectField from './selectField';
import SelectDirection from './selectDirection';

interface Props {
  tableConfig: TableConfig;
  tableSort: TableSort;
}

const Toolbar: React.FC<Props> = (props: Props) => {
  const { tableConfig, tableSort } = props;

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
      <Grid item>
        <SelectField tableConfig={tableConfig} tableSort={tableSort} />
      </Grid>
      <Grid item>
        <SelectDirection tableSort={tableSort} />
      </Grid>
    </Grid>
  );
};

export default Toolbar;
