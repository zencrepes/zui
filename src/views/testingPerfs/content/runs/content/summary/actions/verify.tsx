import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

interface Props {
  run: any;
  verifyRun: any;
  unverifyRun: any;
  updateRunField: any;
}

const DatasetView: React.FC<Props> = (props: Props) => {
  const { run, verifyRun, unverifyRun, updateRunField } = props;

  return (
    <Tooltip
      title={
        run.verified === true
          ? `Run Verified ${run.verified_by ? 'by ' + run.verified_by : ''} ${
              run.verified_date ? 'on ' + format(parseISO(run.verified_date), 'yyyy-MM-dd HH:mm') : ''
            }`
          : 'Run NOT verified'
      }
    >
      <IconButton
        aria-label="Verify run"
        size="small"
        color={run.verified === true ? 'secondary' : 'default'}
        onClick={() => {
          if (run.verified === true) {
            unverifyRun({
              variables: { id: run.id },
              update() {
                updateRunField('verified', false);
              },
            });
          } else {
            verifyRun({
              variables: { id: run.id },
              update() {
                updateRunField('verified', true);
              },
            });
          }
        }}
      >
        <CheckCircleIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DatasetView;
