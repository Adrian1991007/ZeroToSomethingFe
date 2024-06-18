/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { Box, ImageList, Typography, ImageListItem, Grid } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { useTheme } from '@mui/material/styles';

import {
  Layout,
  PageHeader,
  HashTags,
  AdminControls,
  BasicModal,
  ErrorDescription,
  NewsModal,
  NewsCard,
  NewsSkeleton,
} from '../../components';
import { TeamBanner } from '../../resources';
import {
  getNews,
  setDeleteNewsStatus,
  setNewsError,
  deleteNews,
  updateNews,
  setUpdateNewsStatus,
  setSelectedNews,
} from '../../config/redux/slices/NewsSlice';

const News = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const intl = useIntl();

  const { loading, news, selectedNews, delete_news_status, update_news_status, newsError } =
    useSelector((state) => state.news);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const generateHashTags = (hashtags) => {
    if (!hashtags || hashtags.length === 0) return [];

    return hashtags?.map((hashtag) => {
      return { id: hashtag, text: hashtag };
    });
  };

  const values = {
    hashtags: useMemo(() => generateHashTags(selectedNews?.hashtags), [selectedNews]),
  };

  const handleRemove = () => {
    setShowConfirmation(true);
  };

  const onNewsEdit = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (!selectedNews) navigate('/');
  }, [selectedNews]);

  const breakpoints = {
    xs: 400,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  };

  const getColumns = (width) => {
    if (width < breakpoints.xs) {
      return 1;
    } else if (width < breakpoints.sm) {
      return 2;
    } else if (width < breakpoints.md) {
      return 3;
    } else if (width < breakpoints.lg) {
      return 5;
    }
    return 5;
  };

  useEffect(() => {
    dispatch(setSelectedNews(news?.filter((news) => news.id === selectedNews?.id)[0]));
  }, [news, dispatch]);

  useEffect(() => {
    if (delete_news_status === 'success') {
      dispatch(setDeleteNewsStatus(null));
      dispatch(getNews());
      navigate('/');
    }
    if (delete_news_status === 'failed' && newsError) {
      setError(true);
    }
  }, [delete_news_status, newsError, dispatch]);

  useEffect(() => {
    if (update_news_status === 'success') {
      dispatch(setUpdateNewsStatus(null));
      dispatch(getNews());
    }
    if (update_news_status === 'failed' && newsError) {
      setError(true);
    }
  }, [update_news_status, newsError, dispatch]);

  const [columns, setColumns] = useState(getColumns(window.innerWidth));
  const updateDimensions = () => {
    setColumns(getColumns(window.innerWidth));
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const onConfirmDeleteStaff = () => {
    dispatch(deleteNews(selectedNews.id));
    setShowConfirmation(false);
  };
  const handleOnClose = () => {
    setShowModal(false);
  };

  const handleError = () => {
    setError(false);
    dispatch(setNewsError(null));
    dispatch(setDeleteNewsStatus(null));
  };

  const buildHashtags = (hashtags) => {
    if (!hashtags || hashtags.length === 0) return [''];
    return hashtags.map((hashtag) => {
      return hashtag.text;
    });
  };

  const editNews = (news) => {
    setShowModal(false);
    let staffRequest = {
      id: news.id,
      title: news.title,
      description: news.description,
      text: news.text,
      publishDate: new Date(),
      hashtags: buildHashtags(news.hashtags),
      content: news.content,
      contentTypeId: news.contentTypeId,
      newsStatusId: news.newsStatus,
    };

    dispatch(updateNews(staffRequest));
  };

  const onSelectedNews = (news) => {
    dispatch(setSelectedNews(news));
  };

  return (
    <Layout>
      <Box mt='8rem' ml='8rem' position='absolute'>
        <PageHeader
          title={intl.formatMessage({ id: 'lbl.single-news-page-header' })}
          icon={<NewspaperIcon fontSize='large' sx={{ color: 'white', border: 'none' }} />}
          titleProps={{ fontSize: 38 }}
          sx={{ position: 'absolute' }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', overflowX: 'hidden' }}>
        <img
          width='1982px'
          height='400px'
          src={TeamBanner}
          alt={intl.formatMessage({ id: 'lbl.alt-image-staff' })}
        />
      </Box>

      <Box
        py='2rem'
        mx='2rem'
        backgroundColor='header'
        sx={{
          mt: '1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        mt='-5rem'
      >
        <AdminControls
          ml='auto'
          mr='2rem'
          controlsList={[
            { name: 'edit', onClick: onNewsEdit },
            { name: 'delete', onClick: handleRemove },
          ]}
        />
        <Box
          sx={{
            my: '1rem',
            width: '80%',
          }}
        >
          <Typography fontSize='40px' color={theme.palette._yellow}>
            {selectedNews?.title}
          </Typography>
        </Box>

        {selectedNews?.content?.length > 0 && (
          <img
            style={{
              borderRadius: '20px',
              border: '5px solid #FFBA38',
            }}
            width='70%'
            src={selectedNews?.content[0]}
            alt='CSM Suceava'
          />
        )}

        <Box
          sx={{
            my: '1rem',
            width: '80%',
          }}
        >
          <Typography my='2rem' fontSize='19px' color={theme.palette._yellow}>
            {selectedNews?.text}
          </Typography>

          {values['hashtags']?.length > 0 && values['hashtags'][0].text !== '' && (
            <HashTags isReadOnly values={values} />
          )}

          <Typography color={theme.palette._yellow} sx={{ mt: '2rem', float: 'right' }}>
            {dayjs(new Date(selectedNews?.publishDate)).format('DD-MM-YYYY')}
          </Typography>
        </Box>
      </Box>

      {selectedNews?.content?.length > 1 && (
        <Box
          sx={{
            py: '2rem',
            mx: '2rem',
            my: '2rem',
            backgroundColor: 'header',
            height:
              selectedNews?.content?.length > 1
                ? selectedNews?.content?.length > 6
                  ? '43rem'
                  : '24rem'
                : '12rem',
          }}
        >
          <Typography color={theme.palette._yellow} sx={{ ml: '2rem', fontSize: '30px' }}>
            {intl.formatMessage({ id: 'lbl.news_galery' })}
          </Typography>

          <ImageList
            sx={{ width: '100%', height: '85%', px: '2rem', mb: '2rem' }}
            cols={columns}
            rowHeight={250}
          >
            {selectedNews?.content?.slice(1).map((item, index) => (
              <ImageListItem key={index}>
                <img
                  src={item}
                  srcSet={item}
                  alt='test'
                  style={{ float: 'left', width: '100%', height: '100%', objectfit: 'cover' }}
                  loading='lazy'
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}

      <Grid
        sx={{
          mt: '1rem',
          mx: '2rem',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'header',
        }}
      >
        <Typography color={theme.palette._yellow} sx={{ ml: '4rem', fontSize: '30px', mt: '2rem' }}>
          {intl.formatMessage({ id: 'lbl.news-page-header' })}
        </Typography>
        <Grid
          container
          rowSpacing={2}
          pt='1.5rem'
          pb='2rem'
          px='1rem'
          gridTemplateRows='repeat(2, 1fr)'
          gridTemplateColumns='repeat(12, 1fr)'
          gap={4}
          sx={{
            justifyContent: 'center',
            py: '2rem',
          }}
        >
          {!loading &&
            news &&
            news
              .filter((news) => news.id !== selectedNews.id)
              .slice(0, 3)
              .map((news, index) => {
                return <NewsCard key={index + news.id} news={news} onSelected={onSelectedNews} />;
              })}

          {loading && Array.from({ length: 3 }).map((_, index) => <NewsSkeleton key={index} />)}
        </Grid>
      </Grid>

      {error && (
        <BasicModal
          isError
          open={error}
          onClose={handleError}
          title={newsError && <ErrorDescription error={newsError} />}
          onSubmit={handleError}
          save='btn.ok'
          close='btn.cancel'
        />
      )}

      {showModal && (
        <NewsModal
          open={showModal}
          onClose={handleOnClose}
          addNewNews={editNews}
          content={selectedNews}
        />
      )}

      {showConfirmation && (
        <BasicModal
          isError
          open={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          title={intl.formatMessage({ id: 'lbl.delete-confirmation' })}
          onSubmit={onConfirmDeleteStaff}
          save='btn.ok'
        />
      )}
    </Layout>
  );
};

export default News;
