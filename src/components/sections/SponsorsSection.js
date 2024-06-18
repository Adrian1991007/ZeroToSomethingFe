import { useIntl } from 'react-intl';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContentLoader from 'react-content-loader';

import Section from '../section/Section';
import { SponsorCard } from '../cards';
import { BasicModal, ErrorDescription } from '../modals';

import { getSponsors, setSponsorError } from '../../config/redux/slices/SponsorsSlice';

const SponsorsSkeleton = () => {
  return (
    <ContentLoader
      height='150px'
      width='200px'
      speed={1}
      backgroundColor='#333'
      foregroundColor='#999'
    >
      <rect height='150' width='200' />
    </ContentLoader>
  );
};

const SponsorsSection = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [error, setError] = useState(null);

  const { loading, sponsors, sponsorError, sponsor_status } = useSelector(
    (state) => state.sponsors,
  );

  const handleError = () => {
    setError(false);
  };

  useEffect(() => {
    if (!sponsors && !(sponsor_status === 'failed')) {
      dispatch(getSponsors());
    }
    if (sponsor_status === 'failed') {
      setError(true);
    }

    if (sponsors && sponsorError) {
      dispatch(setSponsorError(null));
    }
  }, [sponsors, sponsorError, dispatch]); // Only re-run the effect if sponsors changes

  return (
    <Section
      path='/sponsori'
      headerLabel={intl.formatMessage({ id: 'lbl.sponsor-section' })}
      buttonLabel={intl.formatMessage({ id: 'lbl.sponsor-button-section' })}
    >
      {loading && Array.from({ length: 5 }).map((_, index) => <SponsorsSkeleton key={index} />)}
      {error && (
        <BasicModal
          isError
          open={error}
          onClose={handleError}
          title={sponsorError && <ErrorDescription error={sponsorError} />}
          onSubmit={handleError}
          save='btn.ok'
          close='btn.cancel'
        />
      )}
      {!loading &&
        sponsors &&
        sponsors
          .slice(0, 6)
          .map((sponsor) => <SponsorCard key={sponsor.id} logo={sponsor.logo} url={sponsor.url} />)}
    </Section>
  );
};

export default SponsorsSection;
