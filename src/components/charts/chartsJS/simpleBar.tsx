import React, { Component } from 'react'; // let's also import Component
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Chart from 'chart.js';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      minWidth: '400',
    },
  });

class SimpleBar extends Component<any, any> {
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

  clickChart = (event: any) => {
    const { buckets, openQuery } = this.props;
    const activePoints = this.chart.getElementsAtEvent(event);
    if (activePoints[0] !== undefined) {
      const idx = activePoints[0]._index;
      if (this.allowClick === true) {
        this.allowClick = false;
        const clickedBucket = buckets[idx];
        openQuery(clickedBucket.query);
        setTimeout(() => {
          this.resetAllowClick();
        }, 1000);
      }
    }
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
        onClick: this.clickChart,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
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
        <canvas id="HistoryCompletionChart" ref={this.chartRef} height="200" />
      </div>
    );
  }
}

export default withStyles(styles)(SimpleBar);
