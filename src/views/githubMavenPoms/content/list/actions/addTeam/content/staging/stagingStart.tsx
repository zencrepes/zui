import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const mapDispatch = (dispatch: any) => ({
  setVerifFlag: dispatch.githubMavenPoms.setVerifFlag,
});

type connectedProps = ReturnType<typeof mapDispatch>;

const StagingStart: React.FC<connectedProps> = (props: connectedProps) => {
  const { setVerifFlag } = props;

  useEffect(() => {
    setVerifFlag(true);
  });

  return null;
};
export default connect(null, mapDispatch)(StagingStart);
