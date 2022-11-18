import {
  AppBar,
  Container,
  Grid,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import BarUser from './BarUser';

// MUI Navigation bar with the name of the application, navigation to home page
// navigation to login or signup page or user information if logged in

export default function Header() {
  return (
    <AppBar position="sticky" color="secondary">
      <Container>
        <Toolbar>
          <Grid
            container
            justifyContent="start"
            alignItems="center"
            alignContent="center"
          >
            <Grid item>
              <Link href="/" color="inherit" underline="none">
                <Typography variant="h6">Teleperformance</Typography>
              </Link>
            </Grid>
          </Grid>
          <BarUser />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
