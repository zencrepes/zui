import React, { Component } from 'react'; // let's also import Component
import { createStyles, withStyles } from '@material-ui/core/styles';
import { ResponsiveHeatMap } from '@nivo/heatmap';

import { format } from 'date-fns';

const formatDate = (date: string | number | Date, interval: string) => {
  if (interval === 'month') {
    return format(new Date(date), 'yyyy, MMM');
  }
  if (interval === 'week') {
    return format(new Date(date), 'yyyy, MMM do');
  }
  if (interval === 'day') {
    return format(new Date(date), 'EEE MMM do');
  }
};

const styles = () =>
  createStyles({
    root: {
      height: 800,
    },
  });

export const getCompletionColor = (data: any, value: any, dataset: any) => {
  if (data.xKey === 'avg' || value === -1) {
    return 'rgb(255, 255, 255)';
  }
  // Find current plan
  const plan = dataset.find((p: any) => p['serie'] === data.yKey);
  if (plan !== undefined) {
    const periodAvg = plan['avg'];
    if (periodAvg !== undefined) {
      if (value > periodAvg) {
        // We're going in the reds
        const diff = value - periodAvg;
        if (diff > 2) {
          return 'rgb(244, 117, 96)';
        }
      } else {
        // We're going in the greens
        const diff = periodAvg - value;
        if (diff > 2) {
          return 'rgb(97, 205, 187)';
        }
      }
    }
  }
  return 'rgb(255, 255, 255)';
};

class FailureChart extends Component<any, any> {
  dataset: any = {};

  render() {
    const { dataset, weeks, interval, buckets } = this.props;
    const chartHeight = 50 + dataset.length * 20;

    return (
      <div style={{ height: chartHeight }}>
        <ResponsiveHeatMap
          data={dataset}
          keys={weeks}
          indexBy={'serie'}
          margin={{ top: 0, right: 30, bottom: 100, left: 300 }}
          forceSquare={true}
          axisTop={null}
          axisRight={null}
          cellBorderWidth={1}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.8]] }}
          axisBottom={{
            orient: 'top',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -90,
            legend: '',
            legendOffset: 36,
            format: function (value: any) {
              if (value !== 'avg') {
                return formatDate(value, interval);
              } else {
                return 'Period Average';
              }
            },
          }}
          tooltip={({ xKey, yKey, value }: any) => {
            if (value === -1) {
              return <span>No data available</span>;
            }
            const bucket = buckets.find((b: any) => b.key === yKey);
            if (bucket !== undefined) {
              const dateBucket = bucket.buckets.find((b: any) => b.dateStart === xKey);
              if (dateBucket !== undefined) {
                return (
                  <span>
                    Failure rate: {value}% <br />
                    Total executed tests: {dateBucket.runTotal} <br />
                    Avg tests per run: {dateBucket.runTotalAvg} <br />
                    Total runs: {dateBucket.docCount}
                  </span>
                );
              }
            }
            return <span>Failure rate: {value}%</span>;
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -40,
            format: function (value: any) {
              // This filler is there to ensure there are always at least 10 lines in the chart
              // This clears the line name
              if (value.includes('-EMPTYFILLER-')) {
                return '';
              }
              return value;
            },
          }}
          cellOpacity={1}
          cellBorderColor={'#a4a3a5'}
          cellShape={({
            data,
            value,
            x,
            y,
            width,
            height,
            opacity,
            borderWidth,
            borderColor,
            enableLabel,
            textColor,
            onHover,
            onLeave,
          }: any) => {
            if (value === -1) {
              return (
                <g transform={`translate(${x}, ${y})`} style={{ cursor: 'pointer' }}>
                  <rect
                    x={width * -0.5}
                    y={height * -0.5}
                    width={width}
                    height={height}
                    fill={''}
                    fillOpacity={0}
                    strokeWidth={borderWidth}
                    stroke={borderColor}
                    strokeOpacity={opacity}
                  />
                </g>
              );
            }
            return (
              <g
                transform={`translate(${x}, ${y})`}
                onMouseEnter={onHover}
                onMouseMove={onHover}
                onMouseLeave={onLeave}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={width * -0.5}
                  y={height * -0.5}
                  width={width}
                  height={height}
                  fill={getCompletionColor(data, value, dataset)}
                  fillOpacity={opacity}
                  strokeWidth={borderWidth}
                  stroke={borderColor}
                  strokeOpacity={opacity}
                />
                {enableLabel && (
                  <text
                    dominantBaseline="central"
                    textAnchor="middle"
                    style={{
                      fontSize: 11,
                      fontFamily: 'Roboto, sans-serif',
                      color: '#999999',
                      fill: textColor,
                    }}
                    fillOpacity={opacity}
                  >
                    {value}
                  </text>
                )}
              </g>
            );
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(FailureChart);
