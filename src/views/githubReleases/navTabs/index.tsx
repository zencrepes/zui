import React from 'react';

import UrlListener from './urlListener';
import ContentTabs from './contentTabs';

const NavTabs: React.FC<any> = () => {
  return (
    <React.Fragment>
      <UrlListener />
      <ContentTabs />
    </React.Fragment>
  );
};

export default NavTabs;
