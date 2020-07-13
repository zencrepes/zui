import React from 'react';
import Typography from '@material-ui/core/Typography';

const Intro: React.FC = () => {
  return (
    <React.Fragment>
      <Typography variant="body1" gutterBottom>
        This modal will guide you through various steps towards bulk submittion of data to GitHub (Create, Update or
        Delete). To avoid issues and limit the chance of multiple people modifying data at the same time, a couple of
        verifications will be done and made available for your review.
      </Typography>

      <Typography variant="body1" gutterBottom>
        ZenCrepes will first fetch, from its datastore, all of the data elements to be modified based on the currentl
        query. ZenCrepes will then fetch the same data, from GitHub and verify it matches the previous data. You will
        not be allowed to do any modification if datasets are different (which should not be the case). Then, ZenCrepes
        will present you a list if all of the data elements to be modified (current value, future value) and display any
        potential errors (such as permissions, data mismatch). Finally, if you decide to proceed, ZenCrepes will perform
        the bulk submission.
      </Typography>

      <Typography variant="body1" gutterBottom>
        Nothing will be submitted to GitHub without your explicit confirmation.
      </Typography>
    </React.Fragment>
  );
};
export default Intro;
