import React from 'react';
import Typography from '@material-ui/core/Typography';

import Layout from '../../layout';

import { Dataset } from '../../global';

interface Props {
  datasets?: Dataset[];
}

const Settings: React.FC<Props> = props => {
  return (
    <Layout {...props}>
      <Typography paragraph>This is the settings section</Typography>
      <Typography paragraph>blah blah blah</Typography>
    </Layout>
  );
};

export default Settings;
