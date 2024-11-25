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

  clickChart = (event: any) => {
    const { dataset, openClick } = this.props;
    const activePoints = this.chart.getElementsAtEvent(event);
    if (activePoints[0] !== undefined) {
      const idx = activePoints[0]._index;
      if (this.allowClick === true) {
        this.allowClick = false;
        const clickedBucket = dataset[idx];
        setTimeout(() => {
          openClick(clickedBucket);
          this.resetAllowClick();
        }, 500);
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
        //        responsive: false,
        onClick: this.clickChart,
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
                labelString: 'Tests Count',
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
                labelString: 'Failure rate (%)',
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
