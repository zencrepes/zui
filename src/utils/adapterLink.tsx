import React from 'react';

import { Link, LinkProps } from 'react-router-dom';

const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link innerRef={ref as any} {...props} />
));
AdapterLink.displayName = 'AdapterLink';

export default AdapterLink;
