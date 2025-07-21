import React from 'react';
import { Box, Typography } from '@mui/material';
import './Banner.scss';

const Banner = () => {
  return (
    <Box className="banner">
      <Typography variant="h4">Welcome to TemuDark</Typography>
      <Typography variant="subtitle1">Best deals in the galaxy</Typography>
    </Box>
  );
};

export default Banner;