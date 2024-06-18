import React from 'react';

import { Grid } from '@mui/material';

import Footer from '../footer/Footer';
import { Header } from '../index';

const Layout = ({ children, ...props }) => {
  return (
    <Grid sx={{ overflow: 'visbile' }} backgroundColor='layout' container direction='column'>
      <Header />
      <Grid container direction='column' sx={{ flexWrap: 'nowrap', ...props }}>
        {children}
      </Grid>
      <Footer />
    </Grid>
  );
};

export default Layout;
