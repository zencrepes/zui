import React from 'react';
import Typography from '@material-ui/core/Typography';

import Layout from '../../layout';

import { Type } from '../../global';

interface Props {
  types?: Type[];
  currentTypeKey?: string;
}

const Data: React.FC<Props> = props => {
  return (
    <Layout {...props}>
      <Typography paragraph>
        This is the data view section for {props.currentTypeKey}
      </Typography>
      <Typography paragraph>blah blah blah</Typography>
    </Layout>
  );
};

export default Data;
