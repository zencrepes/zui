import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

interface Props {
  previousRun: string | null;
  setSelectedRunId: (run: any) => void;
}

const PreviousRun: React.FC<Props> = (props: Props) => {
  const { previousRun, setSelectedRunId } = props;

  return (
    <Button
      startIcon={<ArrowBackIcon />}
      variant="outlined"
      color="primary"
      disabled={previousRun === null}
      onClick={() => {
        if (previousRun !== null) {
          setSelectedRunId(previousRun);
        }
      }}
    >
      Previous
    </Button>
  );
};
export default PreviousRun;
