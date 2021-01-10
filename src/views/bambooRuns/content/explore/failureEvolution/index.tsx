import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import add from 'date-fns/add';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { startOfWeek, startOfMonth } from 'date-fns';

import CustomCard from '../../../../../components/customCard';
import FailureChart from '../../../../../components/charts/nivo/failureChart';

const GQL_QUERY = loader('./getFailure.graphql');

interface Props {
  query: any;
  timeWindowPrior: string;
  interval: string;
  headerTitle: string;
}

const buildQuery = (sourceQuery: any, additionalData: any) => {
  let updatedQuery: any = {};

  if (Object.keys(sourceQuery).length === 0) {
    updatedQuery = {
      op: 'and',
      content: [],
    };
  } else {
    updatedQuery = { ...sourceQuery };
  }

  return {
    ...updatedQuery,
    content: [...updatedQuery.content, ...additionalData],
  };
};

const getEmptyWeekCalendar = (firstWeek: Date, lastWeek: Date) => {
  const weekCalendar: Array<string> = [];
  const currentDate = firstWeek;
  lastWeek = add(lastWeek, { days: 1 });
  while (currentDate <= lastWeek) {
    const currentWeekU = startOfWeek(currentDate, { weekStartsOn: 1 });
    currentWeekU.setUTCHours(0, 0, 0, 0); // Needed not to take local browser timezone in consideration.
    const currentWeek = currentWeekU.toISOString();
    if (!weekCalendar.includes(currentWeek)) {
      weekCalendar.push(currentWeek);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return weekCalendar;
};

const getEmptyDayCalendar = (firstDay: Date, lastDay: Date) => {
  const dayCalendar: Array<string> = [];
  const currentDate = firstDay;
  lastDay = add(lastDay, { days: 1 });
  while (currentDate <= lastDay) {
    currentDate.setUTCHours(0, 0, 0, 0); // Needed not to take local browser timezone in consideration.
    dayCalendar.push(currentDate.toISOString());
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dayCalendar;
};

const getEmptyMonthCalendar = (firstMonth: Date, lastMonth: Date) => {
  const weekCalendar: Array<string> = [];
  const currentDate = firstMonth;
  lastMonth = add(lastMonth, { days: 1 });
  while (currentDate <= lastMonth) {
    const currentMonthU = startOfMonth(currentDate);
    currentMonthU.setUTCHours(0, 0, 0, 0); // Needed not to take local browser timezone in consideration.
    const currentMonth = currentMonthU.toISOString();
    if (!weekCalendar.includes(currentMonth)) {
      weekCalendar.push(currentMonth);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return weekCalendar;
};

const buildDataset = (data: any, emptyCalendar: Array<string>) => {
  const dataset = [];
  for (const bucket of data.buckets.filter((b: any) => b.runTotal > 0)) {
    const formattedBucket: any = {};
    formattedBucket['serie'] = bucket.key;
    formattedBucket['avg'] = bucket.runFailureRate;
    for (const week of emptyCalendar) {
      const dateExists = bucket.buckets.find((w: any) => w.dateStart === week);
      if (week !== 'avg') {
        if (dateExists === undefined || dateExists.docCount === 0) {
          formattedBucket[week] = -1;
        } else {
          formattedBucket[week] = dateExists.runFailureRate;
        }
      }
    }
    dataset.push(formattedBucket);
  }
  // We want the chart to include at least 10 series to avoid layout issues
  const missingSeries = 10 - dataset.length;
  if (missingSeries > 0) {
    for (let i = 0; i < missingSeries; i++) {
      const newSerie: any = { serie: '-EMPTYFILLER-' + i, avg: -1 };
      for (const week of emptyCalendar) {
        newSerie[week] = -1;
      }
      dataset.push(newSerie);
    }
  }
  return dataset;
};

const FailureEvolution: React.FC<Props> = (props: Props) => {
  const { query, timeWindowPrior, headerTitle, interval } = props;

  const timeWindow = [{ op: '>=', content: { field: 'startedAt', value: timeWindowPrior } }];

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      query: JSON.stringify(buildQuery(query, timeWindow)),
      interval: interval,
    },
    fetchPolicy: 'network-only',
  });
  if (data !== undefined) {
    const dataset = data.bambooRuns.data.failurerate;
    let emptyCalendar: Array<string> = getEmptyWeekCalendar(
      new Date(dataset.fromDateStart),
      new Date(dataset.toDateStart),
    );
    if (interval === 'day') {
      emptyCalendar = getEmptyDayCalendar(new Date(dataset.fromDateStart), new Date(dataset.toDateStart));
    } else if (interval === 'month') {
      emptyCalendar = getEmptyMonthCalendar(new Date(dataset.fromDateStart), new Date(dataset.toDateStart));
    }

    emptyCalendar.unshift('avg');
    const updatedDataset = buildDataset(dataset, emptyCalendar);
    return (
      <CustomCard headerTitle={headerTitle}>
        <FailureChart dataset={updatedDataset} weeks={emptyCalendar} interval={interval} buckets={dataset.buckets} />
        <Grid container spacing={1} direction="row" justify="center" alignItems="center">
          <Grid item>
            <Typography variant="caption" display="block" gutterBottom>
              From period average:
            </Typography>
          </Grid>
          <Grid item>
            <CheckBoxOutlineBlankIcon />
            <Typography variant="caption" display="block" gutterBottom>
              Less than 2% variance
            </Typography>
          </Grid>
          <Grid item>
            <IndeterminateCheckBoxIcon style={{ color: 'rgb(244, 117, 96)' }} />
            <Typography variant="caption" display="block" gutterBottom>
              Degradation (&gt; 2%)
            </Typography>
          </Grid>
          <Grid item>
            <AddBoxIcon style={{ color: 'rgb(97, 205, 187)' }} />
            <Typography variant="caption" display="block" gutterBottom>
              Improvement (&gt; 2%)
            </Typography>
          </Grid>
        </Grid>
      </CustomCard>
    );
  }
  return <span>Loading data</span>;
};

export default FailureEvolution;
