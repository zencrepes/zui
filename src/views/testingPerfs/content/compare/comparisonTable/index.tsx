import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import CompareIcon from '@material-ui/icons/Compare';
import IconButton from '@material-ui/core/IconButton';

import { iRootState } from '../../../../../store';
import CustomCard from '../../../../../components/customCard';

const mapState = (state: iRootState) => ({
  query: state.testingPerfs.query,
  comparisonTableHideCompare: state.testingPerfs.comparisonTableHideCompare,
  compareReferenceQuerySelected: state.testingPerfs.compareReferenceQuerySelected,
  compareReferenceProfileSelected: state.testingPerfs.compareReferenceProfileSelected,
  compareComparisonQuerySelected: state.testingPerfs.compareComparisonQuerySelected,
  comparisonTableColumns: state.testingPerfs.comparisonTableColumns,
});

const mapDispatch = (dispatch: any) => ({
  setLoading: dispatch.global.setLoading,
  setComparisonTableHideCompare: dispatch.testingPerfs.setComparisonTableHideCompare,
  setCompareReferenceQuerySelected: dispatch.testingPerfs.setCompareReferenceQuerySelected,
  setOpenComparisonTableConfigModal: dispatch.testingPerfs.setOpenComparisonTableConfigModal,
  setCompareReferenceData: dispatch.testingPerfs.setCompareReferenceData,
  setCompareComparisonData: dispatch.testingPerfs.setCompareComparisonData,
});

const GQL_QUERY = loader('./getData.graphql');

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
  table: {
    minWidth: 650,
  },
});

const colorGradient = (value: number, invert = false) => {
  if (invert === true) {
    if (value < -0.5) {
      return '#ff0000';
    } else if (value < -0.2) {
      return '#e06666';
    } else if (value < -0.1) {
      return '#ea9999';
    } else if (value < 0) {
      return '#f4c7c3';
    } else if (value > 0.5) {
      return '#6aa74f';
    } else if (value > 0.2) {
      return '#92c47c';
    } else if (value > 0.1) {
      return '#b5d8a7';
    } else if (value > 0) {
      return '#b5d8a6';
    } else {
      return '#fff';
    }
  } else {
    if (value < -0.5) {
      return '#6aa74f';
    } else if (value < -0.2) {
      return '#92c47c';
    } else if (value < -0.1) {
      return '#b5d8a7';
    } else if (value < 0) {
      return '#b5d8a6';
    } else if (value > 0.5) {
      return '#ff0000';
    } else if (value > 0.2) {
      return '#e06666';
    } else if (value > 0.1) {
      return '#ea9999';
    } else if (value > 0) {
      return '#f4c7c3';
    } else {
      return '#fff';
    }
  }
};

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const ComparisonTable: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const {
    query,
    compareReferenceQuerySelected,
    compareReferenceProfileSelected,
    compareComparisonQuerySelected,
    comparisonTableColumns,
    setOpenComparisonTableConfigModal,
    setCompareReferenceData,
    setCompareComparisonData,
    setComparisonTableHideCompare,
    comparisonTableHideCompare,
    setLoading,
  } = props;

  let refQuery = {};
  if (compareReferenceQuerySelected !== undefined && compareReferenceQuerySelected.query !== undefined) {
    refQuery = compareReferenceQuerySelected.query;
  }

  let compareQuery = {};
  if (compareComparisonQuerySelected !== undefined && compareComparisonQuerySelected.query !== undefined) {
    compareQuery = compareComparisonQuerySelected.query;
  }

  const { data, loading } = useQuery(GQL_QUERY, {
    variables: {
      query: JSON.stringify(query),
      referenceQuery: JSON.stringify(refQuery),
      comparisonQuery: JSON.stringify(compareQuery),
      selectedProfile: compareReferenceProfileSelected === undefined ? '' : compareReferenceProfileSelected,
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data !== undefined && data.testingPerfs.data.reference !== null && data.testingPerfs.data.comparison !== null) {
      setCompareReferenceData(data.testingPerfs.data.reference);
      setCompareComparisonData(data.testingPerfs.data.comparison);
    }
    if (loading) {
      setLoading(true);
      setCompareReferenceData({});
      setCompareComparisonData({});
    } else {
      setLoading(false);
    }
  });

  if (
    !loading &&
    data !== undefined &&
    (data.testingPerfs.data.reference === null || data.testingPerfs.data.comparison === null)
  ) {
    return (
      <CustomCard headerTitle="Results" headerFactTitle="" headerFactValue="">
        <span>The selected query did not return any workable data, try selecting a different dataset</span>
      </CustomCard>
    );
  }

  if (
    !loading &&
    data !== undefined &&
    data.testingPerfs.data.reference !== null &&
    data.testingPerfs.data.comparison !== null
  ) {
    const reference = data.testingPerfs.data.reference;
    const transactions = [...reference.transactions].sort();
    const comparison = data.testingPerfs.data.comparison;

    return (
      <CustomCard
        headerTitle="Results"
        headerFactTitle={
          <>
            <Tooltip title="Export table to CSV - NOT IMPLEMENTED YET">
              <IconButton aria-label="export table to CSV - NOT IMPLEMENTED YET">
                <SaveAltIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Show or hide comparison dataset">
              <IconButton
                aria-label="show or hide comparison dataset"
                onClick={() => {
                  comparisonTableHideCompare
                    ? setComparisonTableHideCompare(false)
                    : setComparisonTableHideCompare(true);
                }}
              >
                <CompareIcon />
              </IconButton>
            </Tooltip>
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
          </>
        }
        headerFactValue=""
      >
        <TableContainer>
          <Table className={classes.table} size="small" aria-label="a dense table" padding="none">
            <TableHead>
              <TableRow>
                <TableCell align="center" rowSpan={3}>
                  Transaction
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={
                    comparisonTableColumns.filter((c: any) => c.type === 'count').length *
                    (comparisonTableHideCompare ? 1 : 3)
                  }
                >
                  Counts
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={
                    comparisonTableColumns.filter((c: any) => c.type === 'responseTime').length *
                    (comparisonTableHideCompare ? 1 : 3)
                  }
                >
                  Response time (miliseconds)
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                {comparisonTableColumns
                  .filter((c: any) => c.visible === true)
                  .map((col: any) => (
                    <TableCell key={col.id} align="center" colSpan={comparisonTableHideCompare ? 1 : 3}>
                      {col.name}
                    </TableCell>
                  ))}
              </TableRow>
              {!comparisonTableHideCompare && (
                <TableRow>
                  {comparisonTableColumns
                    .filter((c: any) => c.visible === true)
                    .map((col: any) => (
                      <React.Fragment key={col.id}>
                        <TableCell align="center">Ref.</TableCell>
                        <TableCell align="center">Comp.</TableCell>
                        <TableCell align="center">Diff</TableCell>
                      </React.Fragment>
                    ))}
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {transactions.map((transaction: any) => (
                <TableRow key={transaction} hover>
                  <TableCell component="th" scope="row">
                    {transaction}
                  </TableCell>
                  {comparisonTableColumns
                    .filter((c: any) => c.visible === true)
                    .map((col: any) => {
                      const refValue = reference.average.find(
                        (v: any) => v.transaction === transaction && v.statisticsKey === col.id,
                      ).value;
                      const compValue = comparison.average.find(
                        (v: any) => v.transaction === transaction && v.statisticsKey === col.id,
                      ).value;
                      let compDiff = 0;
                      if (refValue === 0 && compValue === 0) {
                        compDiff = 0;
                      } else if (compValue === 0) {
                        compDiff = refValue;
                      } else {
                        compDiff = 1 - refValue / compValue;
                      }
                      return {
                        ...col,
                        refValue: Math.round(refValue),
                        compValue: Math.round(compValue),
                        compDiff: compDiff,
                      };
                    })
                    .map((col: any) => (
                      <React.Fragment key={col.id}>
                        <TableCell align="right">{col.refValue}</TableCell>
                        {!comparisonTableHideCompare && (
                          <>
                            <TableCell align="right">{col.compValue}</TableCell>
                            <TableCell
                              align="right"
                              style={{
                                backgroundColor:
                                  col.id === 'throughput'
                                    ? colorGradient(col.compDiff)
                                    : colorGradient(col.compDiff, true),
                              }}
                            >
                              {Math.round(col.compDiff * 100)}%
                            </TableCell>
                          </>
                        )}
                      </React.Fragment>
                    ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomCard>
    );
  }
  return null;
};

export default connect(mapState, mapDispatch)(ComparisonTable);
