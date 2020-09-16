import React from 'react';

import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import Typography from '@material-ui/core/Typography';

const QUERY_DATASETS = loader('./getVersion.graphql');

const DynamicMenu: React.FC<any> = () => {
  const { data } = useQuery(QUERY_DATASETS, {
    fetchPolicy: 'cache-and-network',
  });

  if (data === undefined) {
    return null;
  }

  return (
    <Typography variant="caption" display="block" gutterBottom style={{ textAlign: 'left', padding: 10 }}>
      <i>
        API:
        {data.version === 'latest' || data.version === 'develop' || data.version === '' ? (
          <a href="https://github.com/zencrepes/zapi" target="_blank" rel="noopener noreferrer">
            {data.version}
          </a>
        ) : (
          <a
            href={'https://github.com/zencrepes/zapi/releases/tag/' + data.version}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.version}
          </a>
        )}{' '}
        UI:
        {window._env_.APP_VERSION === 'latest' ||
        window._env_.APP_VERSION === 'develop' ||
        window._env_.APP_VERSION === '' ||
        window._env_.APP_VERSION === undefined ? (
          <a href="https://github.com/zencrepes/zui" target="_blank" rel="noopener noreferrer">
            {window._env_.APP_VERSION === undefined || window._env_.APP_VERSION === ''
              ? 'develop'
              : window._env_.APP_VERSION}
          </a>
        ) : (
          <a
            href={'https://github.com/zencrepes/zui/releases/tag/' + window._env_.APP_VERSION}
            target="_blank"
            rel="noopener noreferrer"
          >
            {window._env_.APP_VERSION}
          </a>
        )}{' '}
      </i>
    </Typography>
  );
};

export default DynamicMenu;
