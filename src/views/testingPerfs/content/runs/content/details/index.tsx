import React from 'react';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { iRootState } from '../../../../../../store';

import CustomCard from '../../../../../../components/customCard';

import SelectProfile from './selectProfile';
import TableConfigModal from './tableConfigModal';

const mapState = (state: iRootState) => ({
  selectedRunData: state.testingPerfs.selectedRunData,
  comparisonTableColumns: state.testingPerfs.comparisonTableColumns,
  selectedRunProfile: state.testingPerfs.selectedRunProfile,
});

const mapDispatch = (dispatch: any) => ({
  setSelectedRunData: dispatch.testingPerfs.setSelectedRunData,
  setOpenComparisonTableConfigModal: dispatch.testingPerfs.setOpenComparisonTableConfigModal,
  setSelectedRunProfile: dispatch.testingPerfs.setSelectedRunProfile,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Details: React.FC<connectedProps> = (props: connectedProps) => {
  const {
    selectedRunData,
    setOpenComparisonTableConfigModal,
    comparisonTableColumns,
    selectedRunProfile,
    setSelectedRunProfile,
  } = props;

  if (selectedRunProfile === '' && selectedRunData.runs.edges[0] !== undefined) {
    setSelectedRunProfile(selectedRunData.runs.edges[0].node.name);
    return null;
  }

  const availableProfiles = selectedRunData.runs.edges.map((r: any) => r.node.name);

  const profileData = selectedRunData.runs.edges
    .map((r: any) => r.node)
    .find((r: any) => r.name === selectedRunProfile);
  if (profileData === undefined) {
    setSelectedRunProfile('');
    return null;
  }
  return (
    <CustomCard
      headerTitle={' '}
      headerFactTitle={
        <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
          <Grid item xs={6}>
            <SelectProfile
              availableProfiles={availableProfiles}
              selectedProfile={selectedRunProfile}
              setSelecteProfile={setSelectedRunProfile}
            />
          </Grid>
          <Grid item xs={6}>
            <Tooltip title="Table Settings">
              <IconButton
                aria-label="table settings"
                onClick={() => {
                  setOpenComparisonTableConfigModal(true);
                }}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      }
      headerFactValue=""
    >
      <TableConfigModal />
      <TableContainer>
        <Table size="small" aria-label="a dense table" padding="none">
          <TableHead>
            <TableRow>
              <TableCell align="center" rowSpan={3}>
                Transaction
              </TableCell>
              {comparisonTableColumns
                .filter((c: any) => c.visible === true)
                .map((col: any) => (
                  <TableCell key={col.id} align="right">
                    {col.name}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {profileData.statistics
              .slice()
              .sort((a: any, b: any) => {
                if (a.transaction < b.transaction) {
                  return -1;
                }
                if (a.transaction > b.transaction) {
                  return 1;
                }
                return 0;
              })
              .map((t: any) => (
                <TableRow key={t.transaction} hover>
                  <TableCell component="td" scope="row">
                    {t.transaction}
                  </TableCell>
                  {comparisonTableColumns
                    .filter((c: any) => c.visible === true)
                    .map((col: any) => (
                      <TableCell component="td" scope="row" align="right" key={col.id}>
                        {Math.round(t[col.id] * 10) / 10}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomCard>
  );
};

export default connect(mapState, mapDispatch)(Details);
