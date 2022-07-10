import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

interface Props {
  nextRun: string | null;
  setSelectedRunId: (value: any) => void;
}

const NextRun: React.FC<Props> = (props: Props) => {
  const { nextRun, setSelectedRunId } = props;

  return (
    <Button
      endIcon={<ArrowForwardIcon />}
      variant="outlined"
      color="primary"
      disabled={nextRun === null}
      onClick={() => {
        if (nextRun !== null) {
          setSelectedRunId(nextRun);
        }
      }}
    >
      Next
    </Button>
  );
};
export default NextRun;
