/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';

import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

import { NoImage } from '../../resources';
import { HashTags } from '../hashTags';

const NewsCard = ({ news, onSelected }) => {
  const theme = useTheme();
  const intl = useIntl();

  const navigate = useNavigate();

  const image = news.content ? news.content[0] : NoImage;

  const generateHashTags = (hashtags) => {
    if (!hashtags || hashtags.length === 0) return [];

    return hashtags?.map((hashtag) => {
      return { id: hashtag, text: hashtag };
    });
  };

  const values = { hashtags: useMemo(() => generateHashTags(news.hashtags), [news]) };

  const handleClick = () => {
    onSelected(news);
    navigate(`/${intl.formatMessage({ id: 'lbl.news-cc' })}/${news.id}`);
  };

  return (
    <Box
      border='none'
      borderRadius='0.5rem'
      backgroundColor={theme.palette._white}
      width='35rem'
      height='25rem'
      as='button'
      sx={{ textAlign: 'initial', display: 'flex', flexDirection: 'column' }}
      p={1}
      onClick={handleClick}
    >
      <img
        height='240px'
        width='100%'
        src={image}
        style={{
          borderRadius: '0.5rem',
          backgroundSize: '5px 100%',
          backgroundPosition: '0 0, 100% 0',
          backgroundRepeat: 'no-repeat',
        }}
        alt='News image'
      />
      <Box
        ml='0.5rem'
        sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>{news.title}</Typography>

        <Typography my='0.5rem'>{news?.description}</Typography>

        {values['hashtags']?.length > 0 && values['hashtags'][0].text !== '' && (
          <HashTags isReadOnly values={values} />
        )}

        <Typography sx={{ textAlign: 'right', fontSize: '14px', mr: '1rem', mt: 'auto' }}>
          {dayjs(news.creationDate).format('DD/MM/YYYY')}
        </Typography>
      </Box>
    </Box>
  );
};

export default NewsCard;
