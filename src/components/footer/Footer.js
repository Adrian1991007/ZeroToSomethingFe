import React from 'react';
import { FaInstagram, FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa';
import { useIntl, FormattedMessage } from 'react-intl';

import { Grid, Typography, Link, IconButton, Box } from '@mui/material';

import { Logo } from '../../resources';

const SocialMedia = () => {
  return (
    <Grid
      item
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
      gap={2}
    >
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        href={'https://www.facebook.com/profile.php?id=100057069055225'}
        target='_blank'
      >
        <FaFacebook />
      </IconButton>
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        href={'https://www.instagram.com/'}
        target='_blank'
      >
        <FaInstagram />
      </IconButton>
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        href={'https://twitter.com/'}
        target='_blank'
      >
        <FaTwitter />
      </IconButton>
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        href={'https://www.youtube.com/'}
        target='_blank'
      >
        <FaYoutube />
      </IconButton>
    </Grid>
  );
};

const UtilLinks = () => {
  const intl = useIntl();
  return (
    <Grid
      item
      sx={{
        textAlign: ['center', 'center', 'initial'],
      }}
    >
      <Logo sx={{ display: { flexGrow: 1 }, textAlign: 'center' }} height='70px' />
      <Grid container direction={['column', 'column', 'column']} pl='1rem' gap={1}>
        <Link sx={{ color: 'white' }} href={'#'}>
          {intl.formatMessage({ id: 'lbl.privacy-policy' })}
        </Link>
        <Link sx={{ color: 'white' }} href={'#'}>
          {intl.formatMessage({ id: 'lbl.security-policy' })}
        </Link>
        <Link sx={{ color: 'white' }} href={'#'}>
          {intl.formatMessage({ id: 'lbl.terms-and-conditions' })}
        </Link>
        <Link sx={{ color: 'white' }} href={'#'}>
          {intl.formatMessage({ id: 'lbl.contact' })}
        </Link>
      </Grid>
    </Grid>
  );
};

export default function Footer() {
  return (
    <Grid
      mt='1rem'
      py='1rem'
      px='2rem'
      container
      justifyContent={['center', 'center', 'space-between']}
      sx={{
        backgroundColor: 'header',
      }}
    >
      <UtilLinks />
      <Box
        my={['0.5rem', 0, 0]}
        mx='2rem'
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography color='white'>
          <FormattedMessage id='lbl.zts' />
        </Typography>
        <Typography color='white'>
          <FormattedMessage id='lbl.rights-reserved' />
        </Typography>
      </Box>

      <SocialMedia />
    </Grid>
  );
}
