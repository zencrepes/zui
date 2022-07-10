import React, { Component } from 'react'; // let's also import Component
import { createStyles, withStyles } from '@material-ui/core/styles';
import Chart from 'chart.js';

const styles = () =>
  createStyles({
    root: {
      minWidth: '400',
    },
  });

class HistoryLineDual extends Component<any, any> {
  chartRef: any = React.createRef();
  chart: any = {};
  allowClick = true;

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.buildChart();
  }

  resetAllowClick = () => {
    this.allowClick = true;
  };

  buildChart = () => {
    const { chartData } = this.props;
    const myChartRef = this.chartRef.current.getContext('2d');

    if (this.chart.destroy !== undefined) {
      this.chart.destroy();
    }
    this.chart = new Chart(myChartRef, {
      type: 'bar',
      data: chartData,
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              id: 'yleft',
              position: 'left',
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Response Time (ms)',
              },
            },
            {
              id: 'yright',
              position: 'right',
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
              scaleLabel: {
                display: true,
                labelString: 'Throughput (q/s)',
              },
            },
          ],
          xAxes: [
            {
              id: 'xbottom',
              position: 'bottom',
              scaleLabel: {
                display: true,
                labelString: 'Profiles',
              },
            },
          ],
        },
        tooltips: {
          position: 'nearest',
          mode: 'index',
          intersect: false,
        },
        plugins: {
          datalabels: {
            display: false,
          },
        },
      },
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <canvas id="HistoryCompletionChart" ref={this.chartRef} height="300" />
      </div>
    );
  }
}

export default withStyles(styles)(HistoryLineDual);
