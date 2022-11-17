import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      position="fixed"
      bottom="0"
      width="100%"
      padding="10px 10px 0px 10px"
      bgcolor="black"
    >
      <Typography variant="h6" color="white">
        Samuel Hincapié Monsalve
      </Typography>
    </Box>
  );
}
