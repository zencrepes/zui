import React, { Component } from "react";
import PropTypes from "prop-types";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";

import TablePaginationActions from "./TablePaginationActions.js";
import Issue from "./Issue.js";

import Header from "./Header/index.js";

class IssuesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 25
    };
  }

  handleChangePage = (event, page) => {
    const { updatePaginationFrom } = this.props;
    updatePaginationFrom(page);
  };

  handleChangeRowsPerPage = event => {
    const { updatePaginationSize } = this.props;
    updatePaginationSize(event.target.value);
    //    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const {
      issues,
      paginationSize,
      paginationTotal,
      paginationFrom
    } = this.props;
    const { rowsPerPage } = this.state;

    // Calculate page
    // Position = x
    // Total = y
    // pagination size = y
    // From 200
    // from 1
    const currentPage = Math.round(paginationFrom / paginationSize);

    return (
      <Table>
        <Header paginationTotal={paginationTotal} />
        <TableBody>
          {issues.map(issue => {
            return <Issue issue={issue} key={issue.id} />;
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={3}
              count={paginationTotal}
              rowsPerPage={paginationSize}
              page={currentPage}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

IssuesTable.propTypes = {
  issues: PropTypes.array.isRequired,
  paginationFrom: PropTypes.number.isRequired,
  paginationSize: PropTypes.number.isRequired,
  paginationTotal: PropTypes.number.isRequired,
  updatePaginationFrom: PropTypes.func.isRequired,
  updatePaginationSize: PropTypes.func.isRequired
};

export default IssuesTable;
