import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

interface Run {
  id: string;
  name: string;
  startedAt: string;
}

interface Props {
  nextRun: Run | null;
  setSelectedRun: (value: any) => void;
}

const NextRun: React.FC<Props> = (props: Props) => {
  const { nextRun, setSelectedRun } = props;

  return (
    <Button
      endIcon={<ArrowForwardIcon />}
      variant="outlined"
      color="primary"
      disabled={nextRun === null}
      onClick={() => {
        if (nextRun !== null) {
          setSelectedRun(nextRun);
        }
      }}
    >
      Next
    </Button>
  );
};
export default NextRun;
