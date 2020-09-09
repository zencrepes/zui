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
  setField: (value: string) => void;
  openMatrixClick: (field: string, fieldValue: string, startWeek: string) => void;
  defaultPoints: boolean;
}

const getEmptyWeekFromData = (data: any) => {
  const weekCalendar: Array<string> = [];

  for (const bucket of data.buckets) {
    for (const week of bucket.weeks) {
      if (!weekCalendar.includes(week.weekStart)) {
        weekCalendar.push(week.weekStart);
      }
    }
  }
  weekCalendar.sort();
  return weekCalendar;
};

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

const buildDataset = (data: any, emptyCalendar: Array<string>, defaultPoints: boolean) => {
  const dataset = [];

  for (const bucket of data.buckets) {
    const formattedBucket: any = {};
    if (defaultPoints) {
      formattedBucket[data.field] = bucket.key + ' (' + bucket.sum + ')';
    } else {
      formattedBucket[data.field] = bucket.key + ' (' + bucket.docCount + ')';
    }
    formattedBucket.value = bucket.key;

    for (const week of emptyCalendar) {
      const weekExist = bucket.weeks.find((w: any) => w.weekStart === week);
      if (defaultPoints) {
        formattedBucket[week] = weekExist === undefined ? 0 : weekExist.sum;
      } else {
        formattedBucket[week] = weekExist === undefined ? 0 : weekExist.docCount;
      }
    }
    dataset.push(formattedBucket);
  }

  return dataset;
};

const Chart: React.FC<Props> = (props: Props) => {
  const { dataset, field, setField, openMatrixClick, defaultPoints } = props;

  const initMaxBuckets = dataset.buckets.length <= 30 ? dataset.buckets.length : 30;
  const [maxBuckets, setMaxBuckets] = React.useState<number>(initMaxBuckets);
  const [displayEmpty, setDisplayEmpty] = React.useState<boolean>(false);

  if (maxBuckets <= 5 && initMaxBuckets > 5) {
    setMaxBuckets(initMaxBuckets);
  }

  let emptyCalendar: Array<string> = [];
  if (displayEmpty === true) {
    emptyCalendar = getEmptyWeekCalendar(new Date(dataset.fromWeekStart), new Date(dataset.toWeekStart));
  } else {
    emptyCalendar = getEmptyWeekFromData(dataset);
  }

  const initWeeks = emptyCalendar.length <= 50 ? emptyCalendar.length : 50;
  const [maxWeeks, setMaxWeeks] = React.useState<number>(initWeeks);

  const emptyCalendarSliced = emptyCalendar.slice(emptyCalendar.length - maxWeeks, emptyCalendar.length);
  let updatedDataset = buildDataset(dataset, emptyCalendarSliced, defaultPoints);

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
          displayEmpty={displayEmpty}
          setDisplayEmpty={setDisplayEmpty}
        />
      </Grid>
      <Grid item xs={12}>
        {updatedDataset.length > 3 ? (
          <MatrixDateChart
            dataset={updatedDataset}
            weeks={emptyCalendarSliced}
            field={field}
            openMatrixClick={openMatrixClick}
          />
        ) : (
          <span>Dataset too small (less than 5 buckets), please make a different selection</span>
        )}
      </Grid>
    </Grid>
  );
};

export default Chart;
