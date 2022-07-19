import React from 'react';
import { connect } from 'react-redux';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { iRootState } from '../../../../../store';

const mapState = (state: iRootState) => ({
  selectedRunTab: state.testingPerfs.selectedRunTab,
});

const mapDispatch = (dispatch: any) => ({
  setSelectedRunTab: dispatch.testingPerfs.setSelectedRunTab,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const ContentTabs: React.FC<connectedProps> = (props: connectedProps) => {
  const { selectedRunTab, setSelectedRunTab } = props;

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setSelectedRunTab(newValue);
  };

  return (
    <Tabs value={selectedRunTab} onChange={handleChange} indicatorColor="primary" textColor="primary">
      <Tab label="Summary" value="summary" />
      <Tab label="Details" value="details" />
      <Tab label="Profiles" value="profiles" />
      <Tab label="Transactions" value="transactions" />
    </Tabs>
  );
};

export default connect(mapState, mapDispatch)(ContentTabs);
