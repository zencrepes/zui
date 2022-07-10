import React from 'react';
import { loader } from 'graphql.macro';
import { useLazyQuery } from '@apollo/client';

import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';

const GQL_QUERY = loader('./getRunById.graphql');

interface Props {
  id: string;
}

const DatasetView: React.FC<Props> = (props: Props) => {
  const { id } = props;

  const [getRun, { loading, data }] = useLazyQuery(GQL_QUERY, {
    variables: { id: id },
    fetchPolicy: 'network-only',
  });

  if (loading) return <p>Loading ...</p>;
  if (data && data.testingPerfs.data.item._source) {
    const a = document.createElement('a');
    const file = new Blob([data.testingPerfs.data.item._source], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = `${id}.json`;
    a.click();
  }

  return (
    <Tooltip title="Download the Run document as a JSON file">
      <IconButton
        aria-label="download as json"
        size="small"
        onClick={() => {
          getRun();
        }}
      >
        <GetAppIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DatasetView;
