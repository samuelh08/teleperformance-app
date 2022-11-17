import React, { useState } from 'react';
import {
  Alert,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

import { createEvent } from '../api/events';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const payload = event.target.elements;
    setLoading(true);
    try {
      await createEvent({
        date: payload.date.value,
      });
      navigate('/');
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h2" margin="10px" color="#7A2180">
            New Event
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
                <InputLabel htmlFor="date" color="secondary">
                  {'Date'}
                </InputLabel>
                <OutlinedInput
                  id="date"
                  label="Date"
                  type="date"
                  color="secondary"
                />
              </FormControl>
            </Grid>
            <Grid item>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={loading}
                color="secondary"
              >
                Create
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
