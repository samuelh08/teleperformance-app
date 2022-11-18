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
  const [winnersDance, setWinnersDance] = useState([]);
  const [winnersSing, setWinnersSing] = useState([]);
  const [winnersDraw, setWinnersDraw] = useState([]);

  // define function to load information as callback to avoid generating it each time
  const loadData = useCallback(async () => {
    try {
      setError(null);
      const event = await getEvent(id);
      setData(event.data);
      const eventDate = new Date(event.data.date);
      const actualDate = new Date();
      // calculate days from actual date to event day
      const daysToEvent =
        (eventDate.getTime() - actualDate.getTime()) / (1000 * 3600 * 24);
      setDays(daysToEvent);
      // extract winners from each category of the event
      const dance = [];
      event.data.inscriptions.forEach((item) => {
        if ((item.category === 'Dancing') & (item.place <= 10)) {
          dance[item.place - 1] = item;
        }
      });
      setWinnersDance(dance);
      const sing = [];
      event.data.inscriptions.forEach((item) => {
        if ((item.category === 'Singing') & (item.place <= 10)) {
          sing[item.place - 1] = item;
        }
      });
      setWinnersSing(sing);
      const draw = [];
      event.data.inscriptions.forEach((item) => {
        if ((item.category === 'Illustration') & (item.place <= 10)) {
          draw[item.place - 1] = item;
        }
      });
      setWinnersDraw(draw);
    } catch (error) {
      // if there is an error its message will be shown as an alert on top
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // load data before page render
  useEffect(() => {
    loadData();
  }, [loadData]);

  // show a loading animation when data is not ready to be shown
  if (loading) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h2" margin="10px" color="#7A2180" align="center">
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
              {user?.position === 'Director' && (
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
            <Box>
              <Typography variant="h4">Singing</Typography>
              {winnersSing.map((item, index) => (
                <Typography
                  variant={item.place <= 3 ? 'h5' : 'h6'}
                  color={item.place <= 3 ? '#E40276' : 'black'}
                  key={index}
                >
                  {index + 1}. {item.user.name}
                </Typography>
              ))}
            </Box>
            <Box>
              <Typography variant="h4">Dancing</Typography>
              {winnersDance.map((item, index) => (
                <Typography
                  variant={item.place <= 3 ? 'h5' : 'h6'}
                  color={item.place <= 3 ? '#E40276' : 'black'}
                  key={index}
                >
                  {index + 1}. {item.user.name}
                </Typography>
              ))}
            </Box>
            <Box>
              <Typography variant="h4">Illustration</Typography>
              {winnersDraw.map((item, index) => (
                <Typography
                  variant={item.place <= 3 ? 'h5' : 'h6'}
                  color={item.place <= 3 ? '#E40276' : 'black'}
                  key={index}
                >
                  {index + 1}. {item.user.name}
                </Typography>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
