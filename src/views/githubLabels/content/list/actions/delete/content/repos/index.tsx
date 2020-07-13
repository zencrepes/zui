import React from 'react';
import { connect } from 'react-redux';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import 'react-dual-listbox/lib/react-dual-listbox.css';
import DualListBox from 'react-dual-listbox';

import { iRootState } from '../../../../../../../../store';

interface Props {
  reposAvailable: { value: string; label: string };
  updateReposSelected: string[];
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '300px',
    },
  }),
);

const mapState = (state: iRootState) => ({
  updateReposAvailable: state.githubLabels.updateReposAvailable,
  updateReposSelected: state.githubLabels.updateReposSelected,
});

const mapDispatch = (dispatch: any) => ({
  setUpdateReposSelected: dispatch.githubLabels.setUpdateReposSelected,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Selector: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { updateReposAvailable, updateReposSelected, setUpdateReposSelected } = props;

  return (
    <div className={classes.root}>
      <DualListBox
        canFilter
        options={updateReposAvailable.map((r: any) => {
          return {
            value: r.id,
            label: r.nameWithOwner,
          };
        })}
        selected={updateReposSelected.map((r: any) => r.id)}
        onChange={(selected: any) => {
          const selectedRepos = updateReposAvailable.filter(
            (r: any) => selected.find((sr: string) => r.id === sr) !== undefined,
          );
          setUpdateReposSelected(selectedRepos);
        }}
      />
    </div>
  );
};
export default connect(mapState, mapDispatch)(Selector);
