import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Box, Button } from '@mui/material';
import Image from 'material-ui-image';

import { NotFoundImage } from '../../resources';

const NotFound = () => {
  let navigate = useNavigate();

  useEffect(() => {
    navigate('/not-found');
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '80vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        flexDirection={'column'}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image src={NotFoundImage} alt='Sponsor logo' />
        <Typography mt='-60px' textAlign={'center'} variant='sponsor'>
          Pagina nu a putut fi gasita
        </Typography>
        <Button
          mt='1rem'
          border='3px solid red'
          sx={{ minWidth: '10rem' }}
          onClick={() => navigate('/')}
        >
          Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
