import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import IconButton from '@material-ui/core/IconButton';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import StopIcon from '@material-ui/icons/Stop';

import { format } from 'date-fns';

import { TableConfig } from '../../../global';

interface Props {
  item: any;
  hasRowArray: boolean;
  tableConfig: TableConfig;
}

const getObjectValue = (obj: any, path: string, defaultValue = undefined) => {
  const travel = (regexp: any) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

const useStyles = makeStyles(() => ({
  link: {
    color: '#586069!important',
    textDecoration: 'none',
  },
}));

const SimpleRow: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const { item, tableConfig, hasRowArray } = props;

  return (
    <React.Fragment>
      <TableRow key={item.id}>
        {hasRowArray && (
          <TableCell padding="none">
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        {tableConfig.columns
          .filter((col) => col.default === true)
          .map((col) => {
            const value = getObjectValue(item, col.field, undefined);
            let cellValue;
            if (col.fieldType === 'boolean') {
              cellValue = <span>{JSON.stringify(value)}</span>;
            } else if (col.fieldType === 'date' && value !== null) {
              cellValue = <span>{format(new Date(value), 'eee MMM d, yyyy')}</span>;
            } else if (col.fieldType === 'array') {
              cellValue = <span>{value.length}</span>;
            } else if (col.linkField !== null) {
              const link = getObjectValue(item, col.linkField, undefined);
              cellValue = (
                <a href={link} className={classes.link} target="_blank" rel="noopener noreferrer">
                  {value}
                </a>
              );
            } else {
              cellValue = <span>{value}</span>;
            }
            return (
              <TableCell component="td" scope="row" padding="none" key={col.field}>
                {col.field === 'color' && <StopIcon key={value} style={{ fill: '#' + value }} />}
                {cellValue}
              </TableCell>
            );
          })}
      </TableRow>
      {hasRowArray && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      {tableConfig.columns
                        .filter((c) => c.fieldType !== undefined && c.fieldType === 'array')
                        .map((arrayCol) => (
                          <TableCell key={arrayCol.field}>{arrayCol.name}</TableCell>
                        ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {tableConfig.columns
                        .filter((c) => c.fieldType !== undefined && c.fieldType === 'array')
                        .map((c) => {
                          const value = getObjectValue(item, c.field, undefined);
                          return (
                            <TableCell key={c.field}>
                              {value.map((v: any) => {
                                const value = getObjectValue(v, c.subfield, undefined);
                                if (c.linkField !== null) {
                                  const link = getObjectValue(v, c.linkField, undefined);
                                  return (
                                    <a
                                      key={value}
                                      href={link}
                                      className={classes.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {value} <br />
                                    </a>
                                  );
                                }
                                return (
                                  <span key={value}>
                                    {value}
                                    <br />
                                  </span>
                                );
                              })}
                            </TableCell>
                          );
                        })}
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

export default SimpleRow;
