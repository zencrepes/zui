import React from 'react';
import { connect } from 'react-redux';

import { iRootState } from '../../../store';

import Explore from './explore';
import List from './list';
import Analyze from './analyze';

const mapState = (state: iRootState) => ({
  selectedTab: state.githubPullrequests.selectedTab,
});

const mapDispatch = (dispatch: any) => ({
  setSelectedTab: dispatch.githubPullrequests.setSelectedTab,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Content: React.FC<connectedProps> = (props: connectedProps) => {
  const { selectedTab } = props;
  switch (selectedTab) {
    case 'explore':
      return <Explore />;
    case 'analyze':
      return <Analyze />;
    case 'list':
      return <List />;
    default:
      return null;
  }
};

export default connect(mapState, mapDispatch)(Content);
