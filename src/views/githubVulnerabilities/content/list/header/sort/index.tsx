import React from 'react';

import Grid from '@material-ui/core/Grid';

import SelectField from './selectField';
import SelectDirection from './selectDirection';

interface Props {
  setSortField: Function;
  sortField: string;
  availableSortFields: Array<any>;

  setSortDirection: Function;
  sortDirection: string;
}

const Toolbar: React.FC<Props> = (props: Props) => {
  const { setSortField, sortField, setSortDirection, sortDirection, availableSortFields } = props;

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
      <Grid item>
        <SelectField sortField={sortField} setSortField={setSortField} availableSortFields={availableSortFields} />
      </Grid>
      <Grid item>
        <SelectDirection sortDirection={sortDirection} setSortDirection={setSortDirection} />
      </Grid>
    </Grid>
  );
};

export default Toolbar;
