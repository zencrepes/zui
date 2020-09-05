import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import RefreshIcon from '@material-ui/icons/Refresh';

import DataCard from './index';

export default {
  title: 'DataCard',
  component: DataCard,
};

const Template: Story<any> = (args) => (
  <DataCard {...args}>
    <span>Some Card content</span>
  </DataCard>
);

export const Base = Template.bind({});

Base.args = {
  title: 'Issues Graph',
  subtitle: 'Generated from the current query',
  menuItems: [
    {
      name: 'Profile',
      onClick: () => {},
    },
    {
      name: 'My account',
      onClick: () => {},
    },
    {
      name: 'Logout',
      onClick: () => {},
    },
    {
      name: 'ABCD',
      onClick: () => {},
    },
  ],
  actionButtons: [
    {
      name: 'Action 1',
      onClick: () => {},
    },
    {
      name: 'Action 2',
      onClick: () => {},
      icon: <RefreshIcon />,
    },
    {
      name: 'Action 3',
      onClick: () => {},
    },
    {
      name: 'Action 4',
      onClick: () => {},
    },
  ],
  headerFactTitle: 'Fact Title',
};

export const Barebone = Template.bind({});

Barebone.args = {
  title: 'Issues Graph',
};
