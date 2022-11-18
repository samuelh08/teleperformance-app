import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { getEvents } from '../api/events';
import UserContext from '../context/user';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // get logged user information from context
  const { user } = useContext(UserContext);

  // define function to load information as callback to avoid generating it each time
  const loadData = useCallback(async () => {
    try {
      const events = await getEvents();
      setData(events.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

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
      <Typography variant="h2" margin="10px" color="#7A2180">
        Events
      </Typography>
      <Grid container display="flex" justifyContent="space-around" spacing={1}>
        {data.map((item) => (
          <Grid item key={item.id}>
            <Card
              key={item.id}
              style={{
                backgroundImage:
                  'linear-gradient(to right, #7A2180 16.67%, #E40276 95.31%)',
              }}
            >
              <CardActionArea href={`/events/${item.id}`}>
                <CardContent>
                  <Typography variant="h6" color="white">
                    {item.date}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {user?.position === 'Director' && (
        <Button
          color="secondary"
          style={{ margin: '20px' }}
          href="/createEvent"
        >
          New Event
        </Button>
      )}
    </>
  );
}
