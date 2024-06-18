import React from 'react';

import { Box } from '@mui/material';

const SponsorCard = ({ logo, url }) => {
  var pattern = /^((http|https):\/\/)/;
  if (!pattern.test(url)) {
    url = 'http://' + url;
  }
  return (
    <Box
      border='none'
      backgroundColor='header'
      as='button'
      onClick={() => window.open(url, '_blank')}
    >
      <img height='150px' width='200px' src={logo} alt='Sponsor logo' />
    </Box>
  );
};

export default SponsorCard;
