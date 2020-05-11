import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import blue from '@material-ui/core/colors/blue';

import { Facet } from './types';

import Selector from './selector';

interface Props {
  facets: Array<Facet>;
  addRemoveBooleanFilter: Function;
  query: any;
  gqlAggregationData: any;
  dataset: string;
}

const useStyles = makeStyles(() => ({
  root: {
    width: '300px',
    marginTop: '10px',
  },
  table: {
    td: {
      padding: 0,
    },
  },
  tableRowName: {
    padding: 0,
  },
  tableRowData: {
    width: 50,
    padding: 0,
  },
  tableRowSwitch: {
    width: 30,
    padding: 0,
  },
  tableRowClose: {
    width: 20,
    padding: 0,
  },
}));

const cardStyle = {
  borderLeft: '4px solid ' + blue[900],
  borderTop: '1px solid #ccc',
  borderRadius: '0px',
  background: '#fafafa',
};

const cardContentStyle = {
  padding: '0px',
};
const BooleanFacet: React.FC<Props> = (props: Props) => {
  const { facets, addRemoveBooleanFilter, query, gqlAggregationData, dataset } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card style={cardStyle}>
        <CardContent>
          <Typography>Boolean Filters</Typography>
        </CardContent>
        <CardContent style={cardContentStyle}>
          <TableContainer>
            <Table size="small" className={classes.table} aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableRowClose}></TableCell>
                  <TableCell className={classes.tableRowName}></TableCell>
                  <TableCell className={classes.tableRowData} align="center">
                    <Typography variant="caption" display="block" gutterBottom>
                      False
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.tableRowSwitch} align="center"></TableCell>
                  <TableCell className={classes.tableRowData} align="center">
                    <Typography variant="caption" display="block" gutterBottom>
                      True
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {facets.map((facet: any) => {
                  return (
                    <Selector
                      gqlAggregationData={gqlAggregationData}
                      query={query}
                      facet={facet}
                      key={facet.field}
                      dataset={dataset}
                      addRemoveBooleanFilter={addRemoveBooleanFilter}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default BooleanFacet;
