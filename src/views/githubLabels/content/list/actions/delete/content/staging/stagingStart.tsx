import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const mapDispatch = (dispatch: any) => ({
  setVerifFlag: dispatch.githubLabels.setVerifFlag,
});

type connectedProps = ReturnType<typeof mapDispatch>;

const StagingTable: React.FC<connectedProps> = (props: connectedProps) => {
  const { setVerifFlag } = props;

  useEffect(() => {
    setVerifFlag(true);
  });

  return null;
};
export default connect(null, mapDispatch)(StagingTable);
