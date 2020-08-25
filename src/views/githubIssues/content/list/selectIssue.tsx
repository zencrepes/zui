import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Checkbox from '@material-ui/core/Checkbox';

import { iRootState } from '../../../../store';
import { Issue } from '../../../../types/github/issue';

const mapState = (state: iRootState) => ({
  updateIssuesSelected: state.githubIssues.updateIssuesSelected,
});

const mapDispatch = (dispatch: any) => ({
  setUpdateIssuesSelected: dispatch.githubIssues.setUpdateIssuesSelected,
  setFetchSelectedFromQuery: dispatch.githubIssues.setFetchSelectedFromQuery,
});

interface Props {
  issue: Issue;
}

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const SelectIssue: React.FC<connectedProps> = (props: connectedProps) => {
  const { updateIssuesSelected, setUpdateIssuesSelected, issue, setFetchSelectedFromQuery } = props;

  useEffect(() => {
    if (updateIssuesSelected.length > 0) {
      setFetchSelectedFromQuery(false);
    } else {
      setFetchSelectedFromQuery(true);
    }
  });

  const issueSelected = updateIssuesSelected.find((i: Issue) => i.id === issue.id) !== undefined;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newIssuesSelection = [...updateIssuesSelected, ...[issue]];
      setUpdateIssuesSelected(newIssuesSelection);
    } else {
      const newIssuesSelection = updateIssuesSelected.filter((i: Issue) => i.id !== issue.id);
      setUpdateIssuesSelected(newIssuesSelection);
    }
  };

  return (
    <Checkbox
      checked={issueSelected}
      onChange={handleChange}
      size="small"
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  );
};

export default connect(mapState, mapDispatch)(SelectIssue);
