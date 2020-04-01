import React from 'react';

import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Grid from '@material-ui/core/Grid/Grid';

interface Props {
  totalCount: number;
}

const Header: React.FC<Props> = (props: Props) => {
  const { totalCount } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={8}>
            <Grid item>
              <span>{totalCount} Pull Requests</span>
            </Grid>
            <Grid item xs={12} sm container></Grid>
          </Grid>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default Header;
