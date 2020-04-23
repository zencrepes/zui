import React from 'react';
import Typography from '@material-ui/core/Typography';

import Layout from '../../layout';

const Dashboard: React.FC<{}> = () => {
  return (
    <Layout>
      <Typography paragraph>The dashboard has not been implemented yet.</Typography>
      <Typography paragraph>Please use the burger menu on the top left to select a dataset.</Typography>
    </Layout>
  );
};

export default Dashboard;
