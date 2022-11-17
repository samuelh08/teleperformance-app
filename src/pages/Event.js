import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getEvent } from '../api/events';
import UserContext from '../context/user';

export default function Event() {
  const params = useParams();
  const { id = '' } = params;
  const { user } = useContext(UserContext);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(0);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const event = await getEvent(id);
      setData(event.data);
      const eventDate = new Date(event.data.date);
      const actualDate = new Date();
      const daysToEvent =
        (eventDate.getTime() - actualDate.getTime()) / (1000 * 3600 * 24);
      setDays(daysToEvent);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h2" margin="10px" color="#7A2180">
        {data.date}
      </Typography>
      <Grid container>
        <Grid item xs={4} padding="10px">
          <Grid container flexDirection="column" spacing={2}>
            <Grid item>
              <Typography variant="h6">
                Inscriptions: {data.inscriptions.length}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Unauthorized Inscription Attempts: {data.unauthorizedAttempts}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Repeated Category Inscription Attempts: {data.doubleAttempts}
              </Typography>
            </Grid>
            <Grid item>
              {days > 3 ? (
                <Button color="secondary" href={`/inscription/${id}`}>
                  Register to this event
                </Button>
              ) : (
                <Typography variant="h6" color="red">
                  Inscriptions to this event are closed
                </Typography>
              )}
              {user.position === 'Director' && (
                <Button color="secondary" href={`/updateEvent/${id}`}>
                  Update this event
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} display="flex" flexDirection="column">
          <Typography variant="h3" alignSelf="center">
            Winners
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignContent: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <Typography variant="h6">Singing</Typography>
            <Typography variant="h6">Dancing</Typography>
            <Typography variant="h6">Illustration</Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
