import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { ResponsiveTreeMap } from '@nivo/treemap';

const style = {
  root: {
    height: '200px',
  },
};

class AggregationTree extends Component<any, any> {
  clickIssues = (data: any) => {
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
      name: '',
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
        <ResponsiveTreeMap
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
          label={(e: any) => this.truncate(e.name)}
          labelFormat=""
          labelSkipSize={40}
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
          onClick={this.clickIssues}
          motionStiffness={90}
          motionDamping={11}
        />
      </div>
    );
  }
}

export default withStyles(style)(AggregationTree);
