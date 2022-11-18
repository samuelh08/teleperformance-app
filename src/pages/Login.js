import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Paper,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { login } from '../api/users';
import UserContext from '../context/user';

export default function Login() {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    // prevents automatic reloading of the page when form is submited
    event.preventDefault();
    // gets form values
    const { employeeId, password } = event.target.elements;
    setLoading(true);
    try {
      // api call
      const json = await login({
        employeeId: employeeId.value,
        password: password.value,
      });
      // set logged user information to context
      context.setUser(json.data);
      navigate(`/`);
    } catch (error) {
      // if there is an error its message will be shown as an alert on top
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}

      <Paper elevation={10} sx={{ margin: '100px auto', maxWidth: '330px' }}>
        <Grid container flexDirection="column" alignItems="center">
          <Grid item>
            <Grid container justifyContent="center" padding="20px">
              <Grid item>
                <Typography variant="h5" color="#7A2180">
                  Teleperformance
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body">Log in to your account</Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              component="form"
              onSubmit={handleSubmit}
              flexDirection="column"
              alignItems="center"
              padding="20px"
              spacing={2}
            >
              <Grid item>
                <FormControl>
                  <InputLabel htmlFor="employeeId" color="secondary">
                    Employee Id
                  </InputLabel>
                  <Input type="tel" id="employeeId" color="secondary" />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <InputLabel htmlFor="password" color="secondary">
                    Password
                  </InputLabel>
                  <Input type="password" id="password" color="secondary" />
                </FormControl>
              </Grid>
              <Grid item>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={loading}
                  color="secondary"
                >
                  Login
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
