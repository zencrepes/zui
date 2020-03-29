import React from 'react';
import Typography from '@material-ui/core/Typography';

import Layout from '../../layout';

import { Dataset } from '../../global';

interface Props {
  datasets?: Dataset[];
  currentDatasetKey?: string;
}

const Data: React.FC<Props> = props => {
  const index = 'zencrepesg';
  const graphqlField = '';
  const projectId = 'githubIssues';

  return (
    <Layout {...props}>
      <Typography paragraph>
        This is the data view section for {props.currentDatasetKey}
      </Typography>
      <Typography paragraph>blah blah blah</Typography>
    </Layout>
  );
};

export default Data;
