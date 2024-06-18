import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';

import {
  Layout,
  Section,
  PageHeader,
  NewsCard,
  NewsModal,
  BasicModal,
  ErrorDescription,
  NewsSkeleton,
  Pagination,
} from '../../components';
import { TeamBanner } from '../../resources';

import {
  getNews,
  setGetNewsStatus,
  setSelectedNews,
  setNewsError,
  setNewNewsStatus,
  newNews,
} from '../../config/redux/slices/NewsSlice';

const LatestNews = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { loading, news, get_news_status, newsError, new_news_status } = useSelector(
    (state) => state.news,
  );

  useEffect(() => {
    if (!news && !(get_news_status === 'failed')) {
      dispatch(getNews());
    }
    if (get_news_status === 'failed' && newsError) {
      setNewsError(true);
    }
    if (news && newsError && get_news_status === 'failed') {
      dispatch(setNewsError(null));
      dispatch(setGetNewsStatus(null));
    }
  }, [news, get_news_status, dispatch]); // Only re-run the effect if news changes

  useEffect(() => {
    if (newsError && new_news_status === 'failed') {
      setError(true);
    }

    if (new_news_status === 'success') {
      dispatch(getNews());
      dispatch(setNewNewsStatus(null));
    }
  }, [newsError, new_news_status, dispatch]); // Only re-run the effect if new_news_status changes

  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(6);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news?.slice(indexOfFirstNews, indexOfLastNews);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onSelectedNews = (news) => {
    dispatch(setSelectedNews(news));
  };

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const onAddClick = () => {
    setShowModal(true);
  };

  const handleOnClose = () => {
    setShowModal(false);
  };

  const buildHashtags = (hashtags) => {
    if (!hashtags || hashtags.length === 0) return [''];
    return hashtags.map((hashtag) => {
      return hashtag.text;
    });
  };
  const addNewNews = (news) => {
    setShowModal(false);
    const newsRequest = {
      title: news.title,
      description: news.description,
      text: news.text,
      publishDate: new Date(),
      hashtags: buildHashtags(news.hashtags),
      content: news.content,
      contentTypeId: news.contentTypeId,
      newsStatusId: news.newsStatus,
    };

    dispatch(newNews(newsRequest));
  };

  const handleError = () => {
    setError(false);
    dispatch(setNewsError(null));
    dispatch(setNewNewsStatus(null));
  };
  return (
    <Layout>
      <Box mt='10rem' ml='10rem' position='absolute'>
        <PageHeader
          title={intl.formatMessage({ id: 'lbl.news-page-header' })}
          icon={<NewspaperIcon fontSize='large' sx={{ color: 'white', border: 'none' }} />}
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

      <Section isNews isStaff onAddClick={onAddClick}>
        {!loading &&
          news &&
          currentNews.map((news, index) => {
            return <NewsCard key={index + news.id} news={news} onSelected={onSelectedNews} />;
          })}

        {loading && Array.from({ length: 6 }).map((_, index) => <NewsSkeleton key={index} />)}

        <Pagination contentPerPage={newsPerPage} numberOfPages={news?.length} paginate={paginate} />
      </Section>

      {showModal && <NewsModal open={showModal} onClose={handleOnClose} addNewNews={addNewNews} />}

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
    </Layout>
  );
};

export default LatestNews;
