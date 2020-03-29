import React from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

interface Props {
  selectedTab: string;
}

const NavTabs: React.FC<Props> = (props: Props) => {
  const { selectedTab } = props;

  const [value, setValue] = React.useState(2);

  console.log(value);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <Tabs value={selectedTab} onChange={handleChange} indicatorColor="primary" textColor="primary">
      <Tab label="Explore" value="stats" />
      <Tab label="List" value="list" />
    </Tabs>
  );
};

export default NavTabs;
