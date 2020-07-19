import React from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { iRootState } from '../../../../../../../../store';

import RowState from './rowState';
import RemoveButton from './removeButton';

const mapState = (state: iRootState) => ({
  updateLabelsSelected: state.githubLabels.updateLabelsSelected,
  editAction: state.githubLabels.editAction,
  labelName: state.githubLabels.labelName,
  labelNameEnable: state.githubLabels.labelNameEnable,
  labelColor: state.githubLabels.labelColor,
  labelColorEnable: state.githubLabels.labelColorEnable,
  labelDescription: state.githubLabels.labelDescription,
  labelDescriptionEnable: state.githubLabels.labelDescriptionEnable,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const StagingTable: React.FC<connectedProps> = (props: connectedProps) => {
  const {
    updateLabelsSelected,
    editAction,
    labelName,
    labelNameEnable,
    labelColor,
    labelColorEnable,
    labelDescription,
    labelDescriptionEnable,
  } = props;

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Action</TableCell>
            <TableCell>Organization</TableCell>
            <TableCell>Repository</TableCell>
            <TableCell>Label</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>GitHub Verified</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {updateLabelsSelected.map((label: any) => (
            <TableRow key={label.id}>
              <TableCell>{editAction}</TableCell>
              <TableCell>{label.repository.owner.login}</TableCell>
              <TableCell>{label.repository.name}</TableCell>
              <TableCell>
                {editAction === 'update' ? (
                  <React.Fragment>
                    {labelNameEnable === false || labelName === label.name ? (
                      <span>
                        <i>No changes</i>
                      </span>
                    ) : (
                      <React.Fragment>
                        <span>
                          <b>Old Value</b>: {label.name}
                        </span>
                        <br />
                        <span>
                          <b>New Value</b>: {labelName}
                        </span>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ) : (
                  <React.Fragment>{label.name}</React.Fragment>
                )}
              </TableCell>
              <TableCell>
                {editAction === 'update' ? (
                  <React.Fragment>
                    {labelColorEnable === false || labelColor === label.color ? (
                      <span>
                        <i>No changes</i>
                      </span>
                    ) : (
                      <React.Fragment>
                        <span>
                          <b>Old Value</b>: {label.color}
                        </span>
                        <br />
                        <span>
                          <b>New Value</b>: {labelColor}
                        </span>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ) : (
                  <React.Fragment>{label.color}</React.Fragment>
                )}
              </TableCell>
              <TableCell>
                {editAction === 'update' ? (
                  <React.Fragment>
                    {labelDescriptionEnable === false || labelDescription === label.description ? (
                      <span>
                        <i>No changes</i>
                      </span>
                    ) : (
                      <React.Fragment>
                        <span>
                          <b>Old Value</b>: {label.description}
                        </span>
                        <br />
                        <span>
                          <b>New Value</b>: {labelDescription}
                        </span>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ) : (
                  <React.Fragment>{label.description}</React.Fragment>
                )}
              </TableCell>
              <TableCell>
                <RowState label={label} />
              </TableCell>
              <TableCell>
                <RemoveButton label={label} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default connect(mapState, mapDispatch)(StagingTable);
