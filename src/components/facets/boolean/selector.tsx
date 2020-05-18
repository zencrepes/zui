import React from 'react';
import { useQuery } from '@apollo/client';

import { makeStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';

import Switch from '@material-ui/core/Switch';
import Chip from '@material-ui/core/Chip';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import blue from '@material-ui/core/colors/blue';

import { Facet } from '../../../global';

import { getFacetKeysInQuery } from '../../../utils/query';

interface Props {
  query: any;
  addRemoveBooleanFilter: Function;
  facet: Facet;
  gqlAggregationData: any;
  dataset: string;
}

const ActiveSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 28,
      height: 14,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 10,
      height: 10,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      height: 12,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }),
)(Switch);

const InactiveSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 28,
      height: 14,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 0,
      height: 0,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      height: 12,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }),
)(Switch);

const useStyles = makeStyles(() => ({
  listItem: {
    marginLeft: '5px',
    padding: '0px',
    height: '20px',
    borderBottom: '1px dashed #e6e6e6',
  },
  listItemText: {
    marginLeft: '5px',
    padding: '0px',
  },
  chip: {
    height: '18px',
    minWidth: 50,
  },
  checkbox: {
    height: '15px',
    width: '15px',
    color: blue[500],
    padding: '5px',
  },
  tableRowData: {
    width: 50,
    padding: 0,
  },
  tableRowName: {
    paddingLeft: 0,
    paddingRight: 10,
  },
  tableRowClose: {
    width: 26,
    padding: 0,
    paddingTop: 2,
  },
  tableRowSwitch: {
    width: 30,
    padding: 0,
    paddingLeft: 5,
    paddingRight: 5,
  },
}));

const Selector: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { query, addRemoveBooleanFilter, facet, gqlAggregationData, dataset } = props;

  const updateValue = (value: string) => {
    if (value === 'true') {
      addRemoveBooleanFilter({ key: 'true', docCount: 0 }, facet);
    } else {
      addRemoveBooleanFilter({ key: 'false', docCount: 0 }, facet);
    }
  };

  const { data } = useQuery(gqlAggregationData, {
    variables: {
      field: facet.field,
      query: JSON.stringify(query),
    },
    fetchPolicy: 'cache-and-network',
  });

  if (data !== undefined && data[dataset].data.aggregations.buckets.length > 0) {
    const buckets = data[dataset].data.aggregations.buckets;
    const trueBucket = buckets.find((b: any) => b.key === '1');
    const trueValue = trueBucket !== undefined ? trueBucket.docCount : 0;
    const falseBucket = buckets.find((b: any) => b.key === '0');
    const falseValue = falseBucket !== undefined ? falseBucket.docCount : 0;

    const currentFacetValuesInQuery = getFacetKeysInQuery(facet, query);

    return (
      <TableRow>
        <TableCell align="left" className={classes.tableRowClose}>
          {currentFacetValuesInQuery.length > 0 && (
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                updateValue(currentFacetValuesInQuery[0]);
              }}
            >
              <HighlightOffIcon color="primary" fontSize="small" />
            </IconButton>
          )}
        </TableCell>
        <TableCell align="left" className={classes.tableRowName}>
          {facet.name}
        </TableCell>
        <TableCell align="center" className={classes.tableRowData}>
          <Chip
            label={falseValue}
            className={classes.chip}
            onClick={() => {
              if (!currentFacetValuesInQuery.includes('false') && falseValue > 0) {
                updateValue('false');
              }
            }}
          />
        </TableCell>
        <TableCell align="center" className={classes.tableRowSwitch}>
          {currentFacetValuesInQuery.length > 0 ? (
            <ActiveSwitch
              checked={currentFacetValuesInQuery.includes('true')}
              onChange={() => {
                if (currentFacetValuesInQuery.includes('false')) {
                  updateValue('true');
                } else {
                  updateValue('false');
                }
              }}
              name="checked"
            />
          ) : (
            <InactiveSwitch
              checked={false}
              onChange={() => {
                updateValue('true');
              }}
              name="checked"
            />
          )}
        </TableCell>
        <TableCell align="center" className={classes.tableRowData}>
          <Chip
            label={trueValue}
            className={classes.chip}
            onClick={() => {
              if (!currentFacetValuesInQuery.includes('true') && trueValue > 0) {
                updateValue('true');
              }
            }}
          />
        </TableCell>
      </TableRow>
    );
  }
  return null;
};

export default Selector;
