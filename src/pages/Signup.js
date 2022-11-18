import React, { useState } from 'react';
import {
  Alert,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/users';

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // define options for select fields
  const sexes = ['Female', 'Male'];
  const cities = ['Medellín', 'Bogotá'];

  // Handler function to create user when Form is submited
  const handleSubmit = async (event) => {
    // prevents automatic reloading of the page when form is submited
    event.preventDefault();
    setError(null);
    // gets form values
    const payload = event.target.elements;
    setLoading(true);
    try {
      // api call
      await signup({
        employeeId: payload.employeeId.value,
        name: payload.name.value,
        position: payload.position.value,
        password: payload.password.value,
        cc: payload.cc.value,
        city: payload.city.value,
        sex: payload.sex.value,
        age: payload.age.value,
      });
      navigate('/login');
    } catch (error) {
      // if there is an error its message will be shown as an alert on top
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container minHeight="100vh">
        <Grid item xs={12} sm={6}>
          <Typography variant="h2" margin="10px" color="#7A2180">
            Signup
          </Typography>
          <Grid
            container
            component="form"
            onSubmit={handleSubmit}
            direction="column"
            spacing={3}
            padding="10px"
          >
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="employeeId" color="secondary">
                  {'Employee Id'}
                </InputLabel>
                <OutlinedInput
                  id="employeeId"
                  label="Employee Id"
                  type="number"
                  color="secondary"
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="name" color="secondary">
                  {'Name'}
                </InputLabel>
                <OutlinedInput id="name" label="Name" color="secondary" />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="position" color="secondary">
                  {'Position'}
                </InputLabel>
                <OutlinedInput
                  id="position"
                  label="Position"
                  color="secondary"
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="password" color="secondary">
                  {'Password'}
                </InputLabel>
                <OutlinedInput
                  type="password"
                  id="password"
                  label="Password"
                  color="secondary"
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="cc" color="secondary">
                  {'Identification number'}
                </InputLabel>
                <OutlinedInput
                  id="cc"
                  label="Identification number"
                  type="number"
                  color="secondary"
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel id="city-label" color="secondary">
                  City
                </InputLabel>
                <Select
                  labelId="city-label"
                  name="city"
                  id="city"
                  label="City"
                  color="secondary"
                >
                  {cities.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel id="sex-label" color="secondary">
                  Sex
                </InputLabel>
                <Select
                  labelId="sex-label"
                  name="sex"
                  id="sex"
                  label="Sex"
                  color="secondary"
                >
                  {sexes.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="age" color="secondary">
                  {'Age'}
                </InputLabel>
                <OutlinedInput
                  id="age"
                  label="Age"
                  type="number"
                  color="secondary"
                />
              </FormControl>
            </Grid>
            <Grid item marginBottom={'50px'}>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={loading}
                color="secondary"
              >
                Sign Up
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={0}
          sm={6}
          position="relative"
          style={{
            backgroundImage:
              'linear-gradient(to right, #7A2180 16.67%, #E40276 95.31%)',
          }}
        />
      </Grid>
    </>
  );
}
