import React, { Component } from 'react'; // let's also import Component
import { createStyles, withStyles } from '@material-ui/core/styles';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import Chart from 'chart.js';

const styles = () =>
  createStyles({
    root: {
      minWidth: '400',
      maxHeight: '200',
    },
  });

class TransactionChart extends Component<any, any> {
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
    const { transaction, metricId, transactionMetrics, selectedRun } = this.props;

    const transactionDetails = transactionMetrics.find((t: any) => t.id === metricId);

    const chartData = {
      datasets: [
        {
          type: 'line',
          pointRadius: 2,
          label: transactionDetails.name,
          data: transaction.runs.map((r: any) => Math.round(r.velocityStatistics[metricId] * 10) / 10),
          backgroundColor: 'rgb(255, 99, 132)', // Red
          borderColor: 'rgb(255, 99, 132)', // Red
          fill: false,
        },
        {
          type: 'line',
          borderColor: 'rgb(54, 162, 235)', // Blue
          pointRadius: 4,
          label: transactionDetails.name,
          data: transaction.runs.map((r: any) => Math.round(r.statistics[metricId] * 10) / 10),
          backgroundColor: 'rgb(54, 162, 235)', // Blue
          showLine: false,
        },
        {
          // This is used to place a circle around the run currently selected
          type: 'line',
          pointRadius: 10,
          pointBorderColor: 'rgb(224, 224, 224)', // Grey
          pointBorderWidth: 3,
          label: transactionDetails.name,
          data: transaction.runs.map((r: any) => {
            if (r.run.id === selectedRun.id) {
              return Math.round(r.statistics[metricId] * 10) / 10;
            }
            return null;
          }),
          backgroundColor: 'rgb(255, 255, 255)', // White
          showLine: false,
        },
      ],
      labels: transaction.runs.map((r: any) => format(parseISO(r.run.startedAt), 'LLL do yyyy HH:mm')),
    };

    const myChartRef = this.chartRef.current.getContext('2d');

    if (this.chart.destroy !== undefined) {
      this.chart.destroy();
    }

    this.chart = new Chart(myChartRef, {
      type: 'bar',
      data: chartData,
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: `${transactionDetails.name} (${transactionDetails.metric})`,
        },
        scales: {
          yAxes: [
            {
              position: 'left',
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: false,
                labelString: 'Value',
              },
            },
          ],
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: false,
                labelString: 'Time',
              },
            },
          ],
        },
      },
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <canvas id="HistoryCompletionChart" ref={this.chartRef} height="100" />
      </div>
    );
  }
}

export default withStyles(styles)(TransactionChart);
