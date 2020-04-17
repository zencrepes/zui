import React, { Component } from 'react'; // let's also import Component
import { createStyles, withStyles } from '@material-ui/core/styles';
import { ResponsiveHeatMapCanvas } from '@nivo/heatmap';

import moment from 'moment';

const styles = () =>
  createStyles({
    root: {
      height: 800,
    },
  });

class MatrixDateChart extends Component<any, any> {
  completionWeeks: any = {};
  dataset: any = {};

  formatWeekEnd = (weekEnd: string) => {
    const date = moment(weekEnd);
    return date.format('MMM Do');
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
          margin={{ top: 0, right: 30, bottom: 60, left: 300 }}
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
            format: (weekEnd: string) => this.formatWeekEnd(weekEnd),
          }}
          axisLeft={{
            orient: 'middle',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -40,
            onClick: () => {
              console.log('On Click');
            },
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(MatrixDateChart);
