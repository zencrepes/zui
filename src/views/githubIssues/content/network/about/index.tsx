import React from 'react';

import Typography from '@material-ui/core/Typography';

import DataCard from '../../../../../components/dataCard';

const Controls: React.FC = () => {
  return (
    <DataCard title="About">
      <Typography variant="body2" gutterBottom>
        The network view draw relations between a set of root nodes and all of their leaves. It allows you to quickly
        discover relation between a network of issues and PRs.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Legend:
      </Typography>
      <Typography variant="body2" gutterBottom>
        - Issues (
        <span role="img" arial-label="emoji">
          {' '}
          🟢
        </span>{' '}
        OPEN,
        <span role="img" arial-label="emoji">
          {' '}
          🔴
        </span>{' '}
        CLOSED) <br />- PRs (
        <span role="img" arial-label="emoji">
          {' '}
          🟩
        </span>{' '}
        OPEN,
        <span role="img" arial-label="emoji">
          {' '}
          🟥
        </span>{' '}
        CLOSED,
        <span role="img" arial-label="emoji">
          {' '}
          🟪
        </span>{' '}
        MERGED) <br />- ROOT nodes
        <span style={{ fontSize: 20 }} role="img" arial-label="emoji">
          {' '}
          🟢 🟥
        </span>{' '}
        (large)
        <br />- LEAF nodes
        <span style={{ fontSize: 10 }} role="img" arial-label="emoji">
          {' '}
          🔴 🟪
        </span>{' '}
        (small) <br />
      </Typography>
    </DataCard>
  );
};

export default Controls;
