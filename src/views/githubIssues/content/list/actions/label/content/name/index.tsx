import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';

import { iRootState } from '../../../../../../../../store';

const mapState = (state: iRootState) => ({
  reposAvailable: state.githubIssues.reposAvailable,
  updateAddLabelName: state.githubIssues.updateAddLabelName,
  githubToken: state.global.githubToken,
  githubClient: state.global.githubClient,
});

const mapDispatch = (dispatch: any) => ({
  setUpdateAddLabelName: dispatch.githubIssues.setUpdateAddLabelName,
  setEditDisableNext: dispatch.githubIssues.setEditDisableNext,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const LabelName: React.FC<connectedProps> = (props: connectedProps) => {
  const { githubToken, setEditDisableNext, setUpdateAddLabelName, updateAddLabelName } = props;

  useEffect(() => {
    if (updateAddLabelName.length > 1) {
      setEditDisableNext(false);
    } else {
      setEditDisableNext(true);
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateAddLabelName(event.target.value);
  };

  if (githubToken !== null) {
    return <TextField id="label-name" label="Label name" value={updateAddLabelName} onChange={handleChange} />;
  } else {
    return null;
  }
};
export default connect(mapState, mapDispatch)(LabelName);
