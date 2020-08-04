import React from 'react';

import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CSVDownload } from 'react-csv';

import { useLazyQuery } from '@apollo/client';

import { TableConfig, TableSort } from '../../../global';

interface Props {
  query: any;
  gqlQuery: any;
  tableSort: TableSort;
  tableConfig: TableConfig;
  totalCount: number;
}

//https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
const get = (obj: any, path: string, defaultValue = undefined) => {
  const travel = (regexp: any) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

// Harcoding and limiting to 8000 records only for the time being
const ExportTsv: React.FC<Props> = (props: Props) => {
  const { query, gqlQuery, totalCount, tableSort, tableConfig } = props;

  const [getItems, { loading, data }] = useLazyQuery(gqlQuery, {
    variables: {
      from: 0,
      size: 8000,
      query: JSON.stringify(query),
      sortField: tableSort.sortField,
      sortDirection: tableSort.sortDirection,
    },
    fetchPolicy: 'cache-and-network',
  });

  const clickButton = async () => {
    getItems();
  };

  let dataset: Array<any> = [];
  if (data !== undefined && data.dataset.data.items.nodes.length > 0) {
    const header = tableConfig.columns.map((c: any) => c.name);
    dataset = data.dataset.data.items.nodes.map((i: any) => {
      return tableConfig.columns.map((c: any) => {
        if (c.fieldType === 'array') {
          const fieldArray = get(i, c.field);
          if (!Array.isArray(fieldArray)) {
            return '';
          }
          let exportString = '';
          let cpt = 0;
          for (const node of fieldArray) {
            exportString = exportString + get(node, c.fieldNode);
            if (fieldArray.length > 1 && cpt < fieldArray.length) {
              exportString = exportString + '|';
            }
            cpt++;
          }
          return exportString;
        } else if (c.fieldType === 'arraysum') {
          const fieldArray = get(i, c.field);
          if (!Array.isArray(fieldArray)) {
            return '';
          }
          let exportValue = 0;
          for (const node of fieldArray) {
            exportValue = exportValue + get(node, c.fieldNode);
          }
          return exportValue;
        }
        return get(i, c.field);
      });
    });
    dataset.unshift(header);
  }

  if (loading) {
    return <CircularProgress variant="indeterminate" disableShrink size={20} thickness={4} />;
  }
  return (
    <React.Fragment>
      <Button variant="contained" color="primary" size="small" startIcon={<GetAppIcon />} onClick={clickButton}>
        TSV
      </Button>
      {totalCount > 8000 && (
        <span>
          <i>(first 8000)</i>{' '}
        </span>
      )}
      {dataset.length > 0 && <CSVDownload data={dataset} target="_blank" />}
    </React.Fragment>
  );
};

export default ExportTsv;
