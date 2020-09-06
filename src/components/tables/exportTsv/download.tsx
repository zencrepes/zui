import React from 'react';

import { CSVDownload } from 'react-csv';

interface Props {
  dataset: any;
  download: boolean;
  setDownload: Function;
}

// Harcoding and limiting to 8000 records only for the time being
const Download: React.FC<Props> = (props: Props) => {
  const { dataset, download, setDownload } = props;

  if (download && dataset.length > 0) {
    setTimeout(() => {
      setDownload(false);
    }, 500);
    return <CSVDownload data={dataset} target="_blank" />;
  }
  return null;
};

export default Download;
