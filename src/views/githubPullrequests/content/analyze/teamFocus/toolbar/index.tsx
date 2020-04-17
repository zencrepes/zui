import React from 'react';

import Grid from '@material-ui/core/Grid';

import SelectField from './selectField';
import SelectWeeks from './selectWeeks';
import SelectBuckets from './selectBuckets';

interface Props {
  setField: Function;
  field: string;
  setMaxWeeks: Function;
  maxWeeks: number;
  setMaxBuckets: Function;
  maxBuckets: number;
  totalWeeks: number;
  totalBuckets: number;
}

const Toolbar: React.FC<Props> = (props: Props) => {
  const { setField, field, setMaxBuckets, setMaxWeeks, maxBuckets, maxWeeks, totalWeeks, totalBuckets } = props;

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
    </Grid>
  );
};

export default Toolbar;
