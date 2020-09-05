import React from 'react';
import { connect } from 'react-redux';

import { iRootState } from '../../../../../store';

import Issue from './issue';
import Partial from './partial';
import Pullrequest from './pullrequest';

const mapDispatch = () => ({});

const mapState = (state: iRootState) => ({
  networkNodeHover: state.githubIssues.networkNodeHover,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
const IssueHover: React.FC<connectedProps> = (props: connectedProps) => {
  const networkNodeHover: any = props.networkNodeHover;

  if (Object.values(networkNodeHover).length === 0) {
    return null;
  }
  if (networkNodeHover.partial) {
    return <Partial node={networkNodeHover} />;
  }
  if (networkNodeHover.typename === 'Issue') {
    return <Issue node={networkNodeHover} />;
  }
  if (networkNodeHover.typename === 'PullRequest') {
    return <Pullrequest node={networkNodeHover} />;
  }
  return null;
};

export default connect(mapState, mapDispatch)(IssueHover);
