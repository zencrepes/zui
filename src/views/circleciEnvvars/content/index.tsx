import React from 'react';
import { connect } from 'react-redux';

import { iRootState } from '../../../store';
import { TableConfig } from '../../../global';

import List from './list';

const mapState = (state: iRootState) => ({
  selectedTab: state.circleciEnvvars.selectedTab,
});

const mapDispatch = (dispatch: any) => ({
  setSelectedTab: dispatch.circleciEnvvars.setSelectedTab,
});

interface Props {
  tableConfig: TableConfig;
}

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const Content: React.FC<connectedProps> = (props: connectedProps) => {
  const { tableConfig } = props;
  return <List tableConfig={tableConfig} />;
};

export default connect(mapState, mapDispatch)(Content);
