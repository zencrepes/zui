import React from 'react';
import { connect } from 'react-redux';

import { iRootState } from '../../../store';

import Explore from './explore';
import List from './list';

const mapState = (state: iRootState) => ({
  selectedTab: state.githubVulnerabilities.selectedTab,
});

const mapDispatch = (dispatch: any) => ({
  setSelectedTab: dispatch.githubVulnerabilities.setSelectedTab,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Content: React.FC<connectedProps> = (props: connectedProps) => {
  const { selectedTab } = props;
  switch (selectedTab) {
    case 'explore':
      return <Explore />;
    case 'list':
      return <List />;
    default:
      return null;
  }
};

export default connect(mapState, mapDispatch)(Content);
