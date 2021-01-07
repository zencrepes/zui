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
    if (onAggClick !== undefined) {
      onAggClick(data.data.name);
    }
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
          data={this.buildDataset()}
          identity="name"
          value="count"
          leavesOnly={true}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          label={(e: any) => this.truncate(e.data.name)}
          labelSkipSize={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
          parentLabelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          borderColor={{ from: 'color', modifiers: [['darker', 0.1]] }}
          onClick={this.clickIssues}
        />
      </div>
    );
  }
}

export default withStyles(style)(AggregationTree);
