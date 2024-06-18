import React from 'react';

import { Button, Box } from '@mui/material';

const Pagination = ({ contentPerPage, numberOfPages, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(numberOfPages / contentPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
      {pageNumbers.map((number) => (
        <Button
          sx={{ color: 'white', width: '50xp', height: '50px' }}
          key={number}
          onClick={() => paginate(number)}
        >
          {number}
        </Button>
      ))}
    </Box>
  );
};

export default Pagination;
