import React from 'react';

import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CSVDownload } from 'react-csv';

import { loader } from 'graphql.macro';

import { useLazyQuery } from '@apollo/client';

const PRS_QUERY = loader('../getPullRequests.graphql');

interface Props {
  query: any;
  sortField: string;
  sortDirection: string;
  totalCount: number;
}

// Harcoding and limiting to 500 records only for the time being
const ExportButton: React.FC<Props> = (props: Props) => {
  const { query, totalCount, sortField, sortDirection } = props;

  const [getItems, { loading, data }] = useLazyQuery(PRS_QUERY, {
    variables: {
      from: 0,
      size: 500,
      query: JSON.stringify(query),
      sortField: sortField,
      sortDirection: sortDirection,
    },
    fetchPolicy: 'cache-and-network',
  });

  const clickButton = async () => {
    getItems();
  };

  let dataset: Array<any> = [];
  if (data !== undefined && data.githubVulnerabilities.data.items.nodes.length > 0) {
    const header = ['Org', 'Repo', 'Created', 'Updated', 'Closed', 'Author', 'Title', 'State', 'Url'];
    dataset = data.githubVulnerabilities.data.items.nodes.map((i: any) => [
      i.repository.owner.login,
      i.repository.name,
      i.createdAt,
      i.updatedAt,
      i.closedAt,
      i.author.login,
      i.title,
      i.state,
      i.url,
    ]);
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
      {totalCount > 500 && (
        <span>
          <i>(first 500)</i>{' '}
        </span>
      )}
      {dataset.length > 0 && <CSVDownload data={dataset} target="_blank" />}
    </React.Fragment>
  );
};

export default ExportButton;
