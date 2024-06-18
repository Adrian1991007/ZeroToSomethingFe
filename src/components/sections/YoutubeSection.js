import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Section from '../section/Section';
import { YoutubeEmbed } from '../youtubeEmbed';

const VideoCard = ({ title, embedId, youtubeWidth, youtubeHeight, ...props }) => {
  const theme = useTheme();

  return (
    <Box
      backgroundColor={theme.palette._white}
      sx={{
        ...props,
        display: 'flex',
        flexDirection: ['column', 'row', 'row', 'row'],
        borderRadius: '15px',
        border: '2px solid',
        my: '0.5rem',
        p: '1rem',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <YoutubeEmbed width={youtubeWidth} height={youtubeHeight} embedId={embedId} />
      <Typography
        sx={{
          fontSize: '23px',
          maxWidth: '22rem',
          ml: '1rem',
          mt: ['1rem', '0.5rem', '0.5rem', '-4rem'],
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

const YoutubeSection = () => {
  return (
    <Section>
      <Box
        width='100%'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: ['column', 'column', 'column', 'row'],
          mx: '1rem',
          maxWidth: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <YoutubeEmbed
            width={'100%'}
            height={['35rem', '40rem', '40rem', '40rem', '40rem']}
            embedId={'8KxLc6eNh-U'}
          />
        </Box>
        <Box
          width='100%'
          ml={['0', '0', '0', '2rem']}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxWidth: '100%',
          }}
        >
          <VideoCard
            mt='1rem'
            title='Highlights |🏐Cupa României 🇷🇴 : CSM Suceava vs "U" Cluj | Volleyball Player Ciubotaru Cosmin'
            embedId={'43QZRsWOyHg'}
            youtubeWidth={['100%', '45rem', '20rem', '30rem']}
            youtubeHeight='15rem'
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              maxWidth: '0%',
            }}
          />
          <VideoCard
            mt='1rem'
            title='Steaua București - CSM Suceava | VOLEI DIVIZIA A1 |'
            embedId={'J7Yg-3-lwDc'}
            youtubeWidth={['100%', '45rem', '20rem', '30rem']}
            youtubeHeight='15rem'
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              maxWidth: '100%',
            }}
          />
        </Box>
      </Box>
    </Section>
  );
};

export default YoutubeSection;
