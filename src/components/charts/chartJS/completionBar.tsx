import React, { Component } from 'react'; // let's also import Component
import { createStyles, withStyles } from '@material-ui/core/styles';
import Chart from 'chart.js';

const styles = () =>
  createStyles({
    root: {
      // minWidth: '400',
    },
  });

class CompletionBar extends Component<any, any> {
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
        setTimeout(() => {
          openQuery(clickedBucket.query);
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
      type: 'horizontalBar',
      data: chartData,
      options: {
        elements: {
          rectangle: {
            borderWidth: 2,
          },
        },
        responsive: true,
        // legend: {
        //   position: 'bottom',
        // },
        legend: {
          display: false,
        },
        tooltips: {
          position: 'nearest',
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function (tooltipItem: any, data: any) {
              const label = data.datasets[tooltipItem.datasetIndex].label;
              return (
                label +
                ': ' +
                data.datasets[tooltipItem.datasetIndex].dataCount[tooltipItem.index] +
                ' (' +
                tooltipItem.xLabel +
                '%)'
              );
            },
          },
        },
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
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
        <canvas id="ProgressCompletionChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default withStyles(styles)(CompletionBar);
