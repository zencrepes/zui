import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

interface Run {
  id: string;
  name: string;
  startedAt: string;
}

interface Props {
  previousRun: Run | null;
  setSelectedRun: (run: any) => void;
}

const PreviousRun: React.FC<Props> = (props: Props) => {
  const { previousRun, setSelectedRun } = props;

  return (
    <Button
      startIcon={<ArrowBackIcon />}
      variant="outlined"
      color="primary"
      disabled={previousRun === null}
      onClick={() => {
        if (previousRun !== null) {
          setSelectedRun(previousRun);
        }
      }}
    >
      Previous
    </Button>
  );
};
export default PreviousRun;
