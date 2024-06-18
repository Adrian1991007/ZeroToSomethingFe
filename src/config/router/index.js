import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import {
  Sponsors,
  Start,
  Calendar,
  LatestNews,
  News,
  Club,
  Staff,
  NotFound,
  Teams,
} from '../../pages';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ZTSRouter = () => {
  return (
    <Router>
      <Fragment>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/sponsori' element={<Sponsors />} />
          <Route path='/noutati' element={<LatestNews />} />
          <Route path='/noutati/:id' element={<News />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/staff/:staffName' element={<Staff />} />
          <Route path='/club' element={<Club />} />
          <Route path='/echipe' element={<Teams />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Fragment>
    </Router>
  );
};

export default ZTSRouter;
