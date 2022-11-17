import React, { useContext, useState } from 'react';
import {
  Alert,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate, useParams } from 'react-router-dom';

import { createInscription } from '../api/inscriptions';
import UserContext from '../context/user';

export default function Inscription() {
  const params = useParams();
  const { id = '' } = params;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = ['Singing', 'Dancing', 'Illustration'];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const payload = event.target.elements;
    setLoading(true);
    try {
      await createInscription({
        category: payload.category.value,
        eventId: id,
        userId: user.id,
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
      {error && <Alert severity="error">{error.message}</Alert>}
      <Grid container minHeight="100vh">
        <Grid item xs={12} sm={6}>
          <Typography variant="h2" margin="10px" color="#7A2180">
            Register
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
                <InputLabel htmlFor="category" color="secondary">
                  {'Category'}
                </InputLabel>
                <Select
                  labelId="category"
                  name="category"
                  id="category"
                  label="Category"
                  color="secondary"
                >
                  {categories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={loading}
                color="secondary"
                disabled={
                  error?.message ===
                  'User already registered to this event category'
                }
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
