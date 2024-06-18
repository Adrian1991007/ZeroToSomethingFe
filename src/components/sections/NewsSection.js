import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import Section from '../section/Section';
import { NewsCard } from '../cards';
import { NewsSkeleton } from '../skeletons';

import {
  getNews,
  setGetNewsStatus,
  setNewsError,
  setSelectedNews,
} from '../../config/redux/slices/NewsSlice';

const NewsSection = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [newsPerPage] = useState(3);

  const { loading, news, get_news_status, newsError } = useSelector((state) => state.news);

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

  const onSelectedNews = (news) => {
    dispatch(setSelectedNews(news));
  };
  return (
    <Section
      path='/noutati'
      headerLabel={intl.formatMessage({ id: 'lbl.news' })}
      buttonLabel={intl.formatMessage({ id: 'lbl.news-button-section' })}
    >
      {!loading &&
        news &&
        news.slice(0, newsPerPage).map((news, index) => {
          return <NewsCard key={index + news.id} news={news} onSelected={onSelectedNews} />;
        })}
      {loading && Array.from({ length: 3 }).map((_, index) => <NewsSkeleton key={index} />)}
    </Section>
  );
};

export default NewsSection;
