import React from 'react';
import { connect } from 'react-redux';

import { iRootState } from '../../../store';
import { TableConfig } from '../../../global';

import Explore from './explore';
import Analyze from './analyze';
import List from './list';

const mapState = (state: iRootState) => ({
  selectedTab: state.jiraIssues.selectedTab,
});

const mapDispatch = (dispatch: any) => ({
  setSelectedTab: dispatch.jiraIssues.setSelectedTab,
});

interface Props {
  tableConfig: TableConfig;
}

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const Content: React.FC<connectedProps> = (props: connectedProps) => {
  const { selectedTab, tableConfig } = props;
  switch (selectedTab) {
    case 'explore':
      return <Explore />;
    case 'analyze':
      return <Analyze />;
    case 'list':
      return <List tableConfig={tableConfig} />;
    default:
      return null;
  }
};

export default connect(mapState, mapDispatch)(Content);
