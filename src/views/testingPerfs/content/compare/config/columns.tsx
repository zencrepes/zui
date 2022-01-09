import React from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import { iRootState } from '../../../../../store';

const mapState = (state: iRootState) => ({
  comparisonTableColumns: state.testingPerfs.comparisonTableColumns,
});

const mapDispatch = (dispatch: any) => ({
  setComparisonTableColumns: dispatch.testingPerfs.setComparisonTableColumns,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Columns: React.FC<connectedProps> = (props: connectedProps) => {
  const { comparisonTableColumns, setComparisonTableColumns } = props;

  const handleClick = (id: string) => {
    const newColumns = comparisonTableColumns.map((c: any) => {
      if (id === c.id) {
        return {
          ...c,
          visible: c.visible === true ? false : true,
        };
      }
      return c;
    });
    setComparisonTableColumns(newColumns);
  };

  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow></TableRow>
        </TableHead>
        <TableBody>
          {comparisonTableColumns.map((col: any) => (
            <TableRow key={col.id} hover onClick={() => handleClick(col.id)}>
              <TableCell padding="checkbox">
                <Checkbox color="primary" checked={col.visible} />
              </TableCell>
              <TableCell component="th" scope="row">
                {col.key}
              </TableCell>
              <TableCell component="th" scope="row">
                {col.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {col.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default connect(mapState, mapDispatch)(Columns);
