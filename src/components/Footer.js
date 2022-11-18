import React from 'react';
import { Box, Typography } from '@mui/material';

// Add developer name to the bottom of the page

export default function Footer() {
  return (
    <Box
      position="fixed"
      bottom="0"
      width="100%"
      padding="10px 10px 0px 10px"
      bgcolor="black"
      display="flex"
      justifyContent="end"
    >
      <Typography variant="h6" color="white" marginRight={5}>
        Samuel Hincapié Monsalve
      </Typography>
    </Box>
  );
}
