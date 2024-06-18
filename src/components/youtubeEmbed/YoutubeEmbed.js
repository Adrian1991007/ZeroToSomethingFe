import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const YoutubeEmbed = ({ embedId, width, height }) => (
  <Box width={width} height={height} sx={{ display: 'flex' }}>
    <iframe
      src={`https://www.youtube.com/embed/${embedId}`}
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
      title='Embedded youtube'
      style={{
        borderRadius: '20px',
        width: '100%',
        height: '100%',
      }}
    />
  </Box>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
