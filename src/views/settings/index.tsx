import React from 'react';
import Typography from '@material-ui/core/Typography';

import Layout from '../../layout';

import { Type } from '../../global';

interface Props {
  types?: Type[];
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
