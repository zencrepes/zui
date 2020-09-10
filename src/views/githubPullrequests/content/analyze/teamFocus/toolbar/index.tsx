import React from 'react';

import Grid from '@material-ui/core/Grid';

import SelectField from './selectField';
import SelectWeeks from './selectWeeks';
import SelectBuckets from './selectBuckets';
import CheckEmpty from './checkEmpty';

interface Props {
  setField: (field: string) => void;
  field: string;
  setMaxWeeks: (maxWeeks: number) => void;
  maxWeeks: number;
  setMaxBuckets: (maxBuckets: number) => void;
  maxBuckets: number;
  totalWeeks: number;
  totalBuckets: number;
  displayEmpty: boolean;
  setDisplayEmpty: (displayEmpty: boolean) => void;
}

const Toolbar: React.FC<Props> = (props: Props) => {
  const {
    setField,
    field,
    setMaxBuckets,
    setMaxWeeks,
    maxBuckets,
    maxWeeks,
    totalWeeks,
    totalBuckets,
    displayEmpty,
    setDisplayEmpty,
  } = props;

  return (
    <Grid container spacing={3} direction="row">
      <Grid item>
        <SelectField field={field} setField={setField} />
      </Grid>
      <Grid item>
        <SelectWeeks maxWeeks={maxWeeks} setMaxWeeks={setMaxWeeks} totalWeeks={totalWeeks} />
      </Grid>
      <Grid item>
        <SelectBuckets maxBuckets={maxBuckets} setMaxBuckets={setMaxBuckets} totalBuckets={totalBuckets} />
      </Grid>
      <Grid item>
        <CheckEmpty displayEmpty={displayEmpty} setDisplayEmpty={setDisplayEmpty} />
      </Grid>
    </Grid>
  );
};

export default Toolbar;
