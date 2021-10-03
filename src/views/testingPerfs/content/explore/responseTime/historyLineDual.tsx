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
    const { chartData, selectedMetricType } = this.props;
    const myChartRef = this.chartRef.current.getContext('2d');

    if (this.chart.destroy !== undefined) {
      this.chart.destroy();
    }
    this.chart = new Chart(myChartRef, {
      type: 'line',
      data: chartData,
      options: {
        maintainAspectRatio: false,
        legend: {
          position: 'right',
        },
        scales: {
          yAxes: [
            {
              position: 'left',
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: selectedMetricType.name + ' (' + selectedMetricType.unit + ')',
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
