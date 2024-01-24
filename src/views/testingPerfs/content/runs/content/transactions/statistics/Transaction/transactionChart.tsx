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
    const { transaction, metricId, transactionMetrics, selectedRun, runsWithShapes } = this.props;

    const transactionDetails = transactionMetrics.find((t: any) => t.id === metricId);

    const dataPoints = runsWithShapes.map((r: any) => {
      return {
        type: 'line',
        pointRadius: 4,
        showLine: false,
        label: r.name,
        data: transaction.runs.map((ru: any) => {
          if (ru.run.name !== r.name) {
            return null;
          }
          return Math.round(ru.statistics[metricId] * 10) / 10;
        }),
        pointStyle: r.shape,
        backgroundColor: r.color,
        borderColor: r.color,
        fill: false,
      };
    });

    const chartData = {
      datasets: [
        {
          type: 'line',
          pointRadius: 2,
          label: 'Rolling Average',
          data: transaction.runs.map((r: any) => Math.round(r.velocityStatistics[metricId] * 10) / 10),
          backgroundColor: 'rgb(255, 99, 132)', // Red
          borderColor: 'rgb(255, 99, 132)', // Red
          fill: false,
        },
        ...dataPoints,
        {
          // This is used to place a circle around the run currently selected
          type: 'line',
          pointRadius: 10,
          pointBorderColor: 'rgb(224, 224, 224)', // Grey
          pointBorderWidth: 3,
          label: 'Current',
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
          display: true,
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
