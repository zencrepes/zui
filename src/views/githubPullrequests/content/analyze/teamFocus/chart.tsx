import React from 'react';

import Grid from '@material-ui/core/Grid';
import startOfWeek from 'date-fns/startOfWeek';
import add from 'date-fns/add';

import MatrixDateChart from '../../../../../components/charts/nivo/matrixDateChart';
import Toolbar from './toolbar';

interface Props {
  query: any;
  dataset: any;
  field: any;
  setField: Function;
}

const getEmptyWeekCalendar = (firstWeek: Date, lastWeek: Date) => {
  const weekCalendar: Array<string> = [];
  const currentDate = firstWeek;
  lastWeek = add(lastWeek, { days: 1 });
  while (currentDate <= lastWeek) {
    const currentWeekU = startOfWeek(currentDate);
    currentWeekU.setUTCHours(0, 0, 0, 0); // Needed not to take local browser timezone in consideration.
    const currentWeek = currentWeekU.toISOString();
    if (!weekCalendar.includes(currentWeek)) {
      weekCalendar.push(currentWeek);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return weekCalendar;
};

const buildDataset = (data: any, emptyCalendar: Array<string>) => {
  const dataset = [];

  for (const bucket of data.buckets) {
    const formattedBucket: any = {};
    formattedBucket[data.field] = bucket.key;
    for (const week of emptyCalendar) {
      const weekExist = bucket.weeks.find((w: any) => w.weekStart === week);
      formattedBucket[week] = weekExist === undefined ? 0 : weekExist.docCount;
    }
    dataset.push(formattedBucket);
  }

  return dataset;
};

const Chart: React.FC<Props> = (props: Props) => {
  const { dataset, field, setField } = props;

  const [maxWeeks, setMaxWeeks] = React.useState<number>(50);
  const [maxBuckets, setMaxBuckets] = React.useState<number>(30);

  const emptyCalendar = getEmptyWeekCalendar(new Date(dataset.fromWeekStart), new Date(dataset.toWeekStart));
  const emptyCalendarSliced = emptyCalendar.slice(emptyCalendar.length - maxWeeks, emptyCalendar.length);
  let updatedDataset = buildDataset(dataset, emptyCalendarSliced);

  updatedDataset = updatedDataset.slice(0, maxBuckets);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Toolbar
          setField={setField}
          field={field}
          maxWeeks={maxWeeks}
          setMaxWeeks={setMaxWeeks}
          totalWeeks={emptyCalendar.length}
          maxBuckets={maxBuckets}
          setMaxBuckets={setMaxBuckets}
          totalBuckets={dataset.buckets.length}
        />
      </Grid>
      <Grid item xs={12}>
        <MatrixDateChart dataset={updatedDataset} weeks={emptyCalendarSliced} field={field} />
      </Grid>
    </Grid>
  );
};

export default Chart;
