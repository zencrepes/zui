import React from 'react';
import { connect } from 'react-redux';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { iRootState } from '../../../store';

const mapState = (state: iRootState) => ({
  selectedTab: state.githubIssues.selectedTab,
});

const mapDispatch = (dispatch: any) => ({
  setSelectedTab: dispatch.githubIssues.setSelectedTab,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const ContentTabs: React.FC<connectedProps> = (props: connectedProps) => {
  const { selectedTab, setSelectedTab } = props;

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Tabs value={selectedTab} onChange={handleChange} indicatorColor="primary" textColor="primary">
      <Tab label="Explore" value="explore" />
      <Tab label="Analyze" value="analyze" />
      <Tab label="Deliver" value="deliver" />
      <Tab label="Network" value="network" />
      {/* <Tab label="Plan" value="plan" /> */}
      <Tab label="List" value="list" />
    </Tabs>
  );
};

export default connect(mapState, mapDispatch)(ContentTabs);
