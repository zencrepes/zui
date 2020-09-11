import React from 'react';
import { connect } from 'react-redux';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { iRootState } from '../../../../../store';

const mapState = (state: iRootState) => ({
  velocityTeams: state.githubIssues.velocityTeams,
  velocitySelectedTeam: state.githubIssues.velocitySelectedTeam,
});

const mapDispatch = (dispatch: any) => ({
  setVelocitySelectedTeam: dispatch.githubIssues.setVelocitySelectedTeam,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const SelectAssignees: React.FC<connectedProps> = (props: connectedProps) => {
  const { velocitySelectedTeam, velocityTeams, setVelocitySelectedTeam } = props;

  const changeDataset = (event: React.ChangeEvent<{ value: unknown }>) => {
    setVelocitySelectedTeam(event.target.value as string);
  };

  return (
    <Select labelId="select-team" id="select-team" value={velocitySelectedTeam} onChange={changeDataset}>
      <MenuItem value={'default'}>All assignees</MenuItem>
      {velocityTeams.map((t: { id: string; title: string }) => {
        return (
          <MenuItem key={t.id} value={t.id}>
            Assignees to: {t.title}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default connect(mapState, mapDispatch)(SelectAssignees);
