import React, { Component } from "react";

import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Grid from "@material-ui/core/Grid/Grid";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { paginationTotal } = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={8}
            >
              <Grid item>
                <span>{paginationTotal} Issues</span>
              </Grid>
              <Grid item xs={12} sm container></Grid>
            </Grid>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

Header.propTypes = {
  paginationTotal: PropTypes.number
};

export default Header;
