import { Button, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';

import UserContext from '../context/user';

// this component adds navigation to signup or login page to Navigation Bar
// or user information if user is logged in

export default function BarUser() {
  const context = useContext(UserContext);
  return context?.user ? (
    <Grid container justifyContent="end" alignItems="baseline">
      <Grid item marginX={2}>
        <Typography color="inherit" variant="body">
          {context.user.name} | {context.user.position}
        </Typography>
      </Grid>
      <Grid item>
        <Button color="inherit" href="/logout">
          Log out
        </Button>
      </Grid>
    </Grid>
  ) : (
    <>
      <Grid container justifyContent="end" alignItems="baseline">
        <Grid item marginX={1}>
          <Button color="inherit" href="/signup">
            Sign up
          </Button>
        </Grid>
        <Grid item marginX={1}>
          <Button color="inherit" href="/login">
            Login
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
