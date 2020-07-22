import React from 'react';

import StagingTable from './table';
import StagingStart from './stagingStart';

const Staging: React.FC<any> = () => {
  return (
    <React.Fragment>
      <StagingStart />
      <StagingTable />
    </React.Fragment>
  );
};
export default Staging;
