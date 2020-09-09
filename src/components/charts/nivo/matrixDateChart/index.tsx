import React, { Component } from 'react'; // let's also import Component
import { createStyles, withStyles } from '@material-ui/core/styles';
import { ResponsiveHeatMapCanvas } from '@nivo/heatmap';

import { format } from 'date-fns';

const formatWeekEnd = (weekStart: string | number | Date) => {
  return format(new Date(weekStart), 'yyyy, MMM do');
};

const styles = () =>
  createStyles({
    root: {
      height: 800,
    },
  });

class MatrixDateChart extends Component<any, any> {
  completionWeeks: any = {};
  dataset: any = {};

  // formatWeekEnd = (weekStart: string) => {
  //   return format(new Date(weekStart), 'yyyy, MMM do');
  // };

  cellClick = (e: any) => {
    const { dataset, field, openMatrixClick } = this.props;
    const startWeek = e.xKey;
    const fieldObject = dataset.find((d: any) => d[field] === e.yKey);
    if (fieldObject !== undefined) {
      const fieldValue = fieldObject.value;
      openMatrixClick(field, fieldValue, startWeek);
    }
  };

  render() {
    const { dataset, weeks, field } = this.props;
    this.completionWeeks = {};
    const chartHeight = 50 + dataset.length * 20;
    return (
      <div style={{ height: chartHeight }}>
        <ResponsiveHeatMapCanvas
          data={dataset}
          keys={weeks}
          indexBy={field}
          margin={{ top: 0, right: 30, bottom: 100, left: 300 }}
          forceSquare={true}
          axisTop={null}
          axisRight={null}
          cellBorderWidth={1}
          colors="blues"
          axisBottom={{
            orient: 'top',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -90,
            legend: '',
            legendOffset: 36,
            format: function (value) {
              return formatWeekEnd(value);
            },
            // format: (weekStart: string) => this.formatWeekEnd(weekStart),
          }}
          axisLeft={{
            // orient: 'middle',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -40,
            // onClick: () => {
            //   console.log('On Click');
            // },
          }}
          onClick={(e) => {
            this.cellClick(e);
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(MatrixDateChart);
