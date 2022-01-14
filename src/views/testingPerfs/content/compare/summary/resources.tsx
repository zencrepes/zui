import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

interface Props {
  dataset: any;
}

const DatasetView: React.FC<Props> = (props: Props) => {
  const { dataset } = props;

  const resources = [];
  for (const run of dataset.runs) {
    for (const r of run.resources.edges) {
      resources.push({ ...r.node, uid: `${r.node.id}${r.node.name}${r.node.size}` });
    }
  }

  const grouppedResources = resources.reduce((acc, r) => {
    const currentResource = acc.find((racc: any) => r.uid === racc.uid);
    if (currentResource === undefined) {
      acc.push({ ...r, runs: 1 });
    } else {
      // If the element exists, we first remove it from the accumulator, then increment and add back
      acc = acc.filter((racc: any) => r.uid !== racc.uid);
      acc.push({ ...currentResource, runs: currentResource.runs + 1 });
    }
    return acc;
  }, []);

  grouppedResources.sort((a: any, b: any) => {
    if (a.image < b.image) {
      return -1;
    }
    if (a.image > b.image) {
      return 1;
    }
    return 0;
  });

  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Runs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {grouppedResources.map((resource: any) => (
            <TableRow key={resource.uid}>
              <TableCell component="th" scope="row">
                {resource.name}
              </TableCell>
              <TableCell>{resource.image}</TableCell>
              <TableCell>{resource.size}</TableCell>
              <TableCell>{resource.runs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DatasetView;
