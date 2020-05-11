import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { ResponsiveBubble } from '@nivo/circle-packing';

const style = {
  root: {
    height: 400,
  },
};

class AggregationBubble extends Component<any, any> {
  clickNode = (data: any) => {
    const { onAggClick } = this.props;
    onAggClick(data.data.name);
  };

  truncate = (c: string) => {
    // Simply truncate the string if greater than 10 characters
    if (c.length <= 10) {
      return c;
    }
    return c.slice(0, 10) + '...';
  };

  buildDataset() {
    const { buckets } = this.props;
    const chartData = {
      name: 'dataset',
      count: 10,
      color: 'hsl(67, 70%, 50%)',
      children: buckets.map((v: any) => {
        return { name: v.key, count: v.docCount };
      }),
    };
    return chartData;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ResponsiveBubble
          root={this.buildDataset()}
          identity="name"
          value="count"
          innerPadding={3}
          outerPadding={3}
          leavesOnly={true}
          margin={{
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          label={(e: any) => this.truncate(e.data.name)}
          labelFormat=""
          labelSkipRadius={16}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.2]],
          }}
          colorBy="name"
          colors={{
            scheme: 'pastel1',
          }}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.3]],
          }}
          animate={true}
          onClick={this.clickNode}
          motionStiffness={90}
          motionDamping={11}
          isZoomable={false}
        />
      </div>
    );
  }
}

export default withStyles(style)(AggregationBubble);
