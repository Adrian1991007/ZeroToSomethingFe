import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';

import logo from './images/logo_invert.png';

const Logo = ({ height, ...props }) => {
  let navigate = useNavigate();

  return (
    <Box {...props}>
      <img src={logo} height={height} alt='CSM Suceava' onClick={() => navigate('/')} />
    </Box>
  );
};

export default Logo;
