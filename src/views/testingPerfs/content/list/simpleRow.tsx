import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import { format } from 'date-fns';
import { TableConfig } from '../../../../global';

interface Props {
  item: any;
  hasRowArray: boolean;
  tableConfig: TableConfig;
  disableRun: any;
  enableRun: any;
  refetch: any;
  userName: string;
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
  const { item, tableConfig, disableRun, enableRun, refetch, userName } = props;

  return (
    <React.Fragment>
      <TableRow key={item.id}>
        {tableConfig.columns
          .filter((col) => col.default === true)
          .map((col) => {
            const value = getObjectValue(item, col.field, undefined);
            let cellValue: any = ' ';
            if (value === undefined) {
              cellValue = '';
            } else if (col.fieldType === 'boolean') {
              if (value === null) {
                cellValue = <span></span>;
              } else {
                cellValue = <span>{JSON.stringify(value)}</span>;
              }
            } else if (col.fieldType === 'date' && value !== null) {
              cellValue = <span>{format(new Date(value), 'eee MMM d, yyyy - HH:mm:ss')}</span>;
            } else if (col.fieldType === 'datetime' && value !== null) {
              cellValue = <span>{format(new Date(value), 'eee MMM d, yyyy - HH:mm XX')}</span>;
            } else if (col.fieldType === 'array') {
              cellValue = <span>{value.length}</span>;
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
                {cellValue}
              </TableCell>
            );
          })}
        <TableCell component="td" scope="row" padding="none">
          <Tooltip title="Enable or disable the document. This does not delete the record and can be reverted">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                if (item.disabled) {
                  enableRun({
                    variables: { id: item.id, username: userName },
                    update() {
                      refetch();
                    },
                  });
                } else {
                  disableRun({
                    variables: { id: item.id, username: userName },
                    update() {
                      refetch();
                    },
                  });
                }
              }}
            >
              {item.disabled ? <RestoreFromTrashIcon /> : <DeleteIcon />}
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default SimpleRow;
