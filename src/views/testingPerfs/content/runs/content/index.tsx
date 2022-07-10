import React from 'react';
import { connect } from 'react-redux';

import { iRootState } from '../../../../../store';
import { TableConfig } from '../../../../../global';

import Summary from './summary';
import Details from './details';
import Profiles from './profiles';
import Transactions from './transactions';

const mapState = (state: iRootState) => ({
  selectedRunTab: state.testingPerfs.selectedRunTab,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Content: React.FC<connectedProps> = (props: connectedProps) => {
  const { selectedRunTab } = props;
  switch (selectedRunTab) {
    case 'summary':
      return <Summary />;
    case 'details':
      return <Details />;
    case 'profiles':
      return <Profiles />;
    case 'transactions':
      return <Transactions />;
    default:
      return null;
  }
};

export default connect(mapState, mapDispatch)(Content);
