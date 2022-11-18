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
import { useNavigate, useParams } from 'react-router-dom';

import { updateEvent } from '../api/events';

export default function CreateEvent() {
  // get event id from params
  const params = useParams();
  const { id = '' } = params;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handler function to update event when Form is submited
  const handleSubmit = async (event) => {
    // prevents automatic reloading of the page when form is submited
    event.preventDefault();
    setError(null);
    // gets form values
    const payload = event.target.elements;
    setLoading(true);
    try {
      // api call
      await updateEvent({
        id,
        date: payload.date.value,
      });
      navigate(`/events/${id}`);
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
            Update Event
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
                Update
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
