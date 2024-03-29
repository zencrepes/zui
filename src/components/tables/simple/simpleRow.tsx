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
import Grid from '@material-ui/core/Grid/Grid';
import { Label } from '@primer/components';
import randomColor from 'randomcolor';
import { format } from 'date-fns';

import * as MicroBarChart from 'react-micro-bar-chart';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import StopIcon from '@material-ui/icons/Stop';

import { TableConfig } from '../../../global';

interface Props {
  item: any;
  hasRowArray: boolean;
  tableConfig: TableConfig;
}

const getContrastYIQ = (hexcolor: string) => {
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
};

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
            let cellValue: any = ' ';
            if (value === undefined) {
              cellValue = '';
            } else if (col.fieldType === 'boolean') {
              cellValue = <span>{JSON.stringify(value)}</span>;
            } else if (col.fieldType === 'date' && value !== null) {
              cellValue = <span>{format(new Date(value), 'eee MMM d, yyyy')}</span>;
            } else if (col.fieldType === 'datetime' && value !== null) {
              cellValue = <span>{format(new Date(value), 'eee MMM d, yyyy - HH:mm XX')}</span>;
            } else if (col.fieldType === 'array') {
              cellValue = <span>{value.length}</span>;
            } else if (col.fieldType === 'microchart') {
              const commitsCpt = value.data
                .map((d: any) => d.count)
                .reduce((acc: number, count: number) => acc + count, 0);
              if (commitsCpt > 0) {
                cellValue = (
                  <MicroBarChart
                    data={value.data.map((d: any) => d.count)}
                    tooltip
                    tipOffset={[0, 20]}
                    tipTemplate={(d: any, i: any) => value.tooltips[i]}
                    hoverColor="rgb(161,130,214)"
                    fillColor={value.fillColor}
                  />
                );
              } else {
                cellValue = <span>None in 12 months</span>;
              }
            } else if (col.fieldType === 'rowarray') {
              if (value.length > 0) {
                const nodes = value.map((t: any) => getObjectValue(t, col.subfield, undefined)).sort();
                cellValue = (
                  <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={0}>
                    {nodes.map((nodeValue: any) => {
                      const bgColor = randomColor({
                        luminosity: 'dark',
                        format: 'rgb', // e.g. 'rgb(225,200,20)'
                        seed: nodeValue,
                      });
                      return (
                        <Grid item key={nodeValue}>
                          <Label
                            variant="small"
                            m={1}
                            style={{ background: bgColor, fontWeight: 400 }}
                            color={getContrastYIQ(bgColor)}
                          >
                            {nodeValue}
                          </Label>
                        </Grid>
                      );
                    })}
                  </Grid>
                );
              }
            } else if (col.linkField !== null) {
              const link = getObjectValue(item, col.linkField, undefined);
              if (link !== null && link !== '') {
                cellValue = (
                  <a href={link} className={classes.link} target="_blank" rel="noopener noreferrer">
                    {value}
                  </a>
                );
              } else {
                cellValue = <span>{value}</span>;
              }
            } else if (col.fieldType === 'longstring') {
              // Limit the string length to 30 characters
              if (value.length > 30) {
                cellValue = (
                  <span>
                    {value.slice(0, 15)}...{value.slice(-5)}
                  </span>
                );
              } else {
                cellValue = <span>{value}</span>;
              }
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
