import React from 'react';
import { connect } from 'react-redux';

import { makeStyles, createStyles } from '@material-ui/core/styles';

import 'react-dual-listbox/lib/react-dual-listbox.css';
import DualListBox from 'react-dual-listbox';

import { iRootState } from '../../../../../../../store';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '300px',
    },
  }),
);

const mapState = (state: iRootState) => ({
  updateLabelsAvailable: state.githubLabels.updateLabelsAvailable,
  updateReposSelected: state.githubLabels.updateReposSelected,
  updateLabelsSelected: state.githubLabels.updateLabelsSelected,
});

const mapDispatch = (dispatch: any) => ({
  setUpdateLabelsSelected: dispatch.githubLabels.setUpdateLabelsSelected,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Selector: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { updateLabelsAvailable, updateLabelsSelected, setUpdateLabelsSelected, updateReposSelected } = props;

  const uniqueAvailableLabels = updateLabelsAvailable
    // Ensure the repository is in of one of the previously selected repos
    .filter((l: any) => updateReposSelected.find((r: any) => r.id === l.repository.id) !== undefined)
    .map((l: any) => l.name)
    .reduce((acc: string[], current: string) => {
      if (!acc.includes(current)) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

  const uniqueSelectedLabels = updateLabelsSelected
    // Ensure the repository is in of one of the previously selected repos
    .filter((l: any) => updateReposSelected.find((r: any) => r.id === l.repository.id) !== undefined)
    .map((l: any) => l.name)
    .reduce((acc: string[], current: string) => {
      if (!acc.includes(current)) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

  return (
    <div className={classes.root}>
      <DualListBox
        canFilter
        options={uniqueAvailableLabels.map((l: string) => {
          return {
            value: l,
            label: l,
          };
        })}
        selected={uniqueSelectedLabels.map((l: string) => l)}
        onChange={(selected: any) => {
          const selectedLabels = updateLabelsAvailable.filter(
            (l: any) => selected.find((sl: string) => l.name === sl) !== undefined,
          );
          setUpdateLabelsSelected(selectedLabels);
        }}
      />
    </div>
  );
};
export default connect(mapState, mapDispatch)(Selector);
