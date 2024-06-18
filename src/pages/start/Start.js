import React from 'react';
import { useIntl } from 'react-intl';

import { Box } from '@mui/material';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';

import { TeamBanner } from '../../resources';
import {
  Layout,
  NewsSection,
  SponsorsSection,
  StaffSection,
  YoutubeSection,
  MatchesSection,
  PageHeader,
} from '../../components';

const Start = () => {
  const intl = useIntl();
  return (
    <Layout>
      <Box mt='10rem' ml='10rem' position='absolute'>
        <PageHeader
          title={intl.formatMessage({ id: 'lbl.club-start' })}
          icon={<SportsVolleyballIcon fontSize='large' sx={{ color: 'white', border: 'none' }} />}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', overflowX: 'hidden' }}>
        <img
          width='1982px'
          height='400px'
          src={TeamBanner}
          alt={intl.formatMessage({ id: 'lbl.alt-image-sponsors' })}
        />
      </Box>
      <NewsSection />
      <MatchesSection />
      <StaffSection />
      <YoutubeSection />
      <SponsorsSection />
    </Layout>
  );
};

export default Start;
