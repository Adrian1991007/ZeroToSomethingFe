import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import {
  BasicModal,
  ErrorDescription,
  MatchCard,
  MatchesSkeleton,
  Section,
} from '../../components';

import {
  getMatches,
  setNewMatchStatus,
  setMatchError,
  setUpdateMatchStatus,
  setDeleteMatchStatus,
  setMatchStatus,
} from '../../config/redux/slices/MatchesSlice';

const MatchesSection = () => {
  const [error, setError] = useState(null);
  const intl = useIntl();
  const dispatch = useDispatch();
  const [matchesPerPage] = useState(3);

  const { loading, matches, match_Status, matchError, update_match_status, delete_match_status } =
    useSelector((state) => state.matches);

  useEffect(() => {
    if (!matches && !(match_Status === 'failed')) {
      dispatch(getMatches());
    }
    if (match_Status === 'failed' && matchError) {
      setError(true);
    }
    if (matches && matchError && match_Status === 'failed') {
      dispatch(setMatchStatus(null));
    }
  }, [matches, match_Status, dispatch]); // Only re-run the effect if news changes

  useEffect(() => {
    if (update_match_status === 'success') {
      dispatch(setUpdateMatchStatus(null));
      dispatch(getMatches());
    }
    if (update_match_status === 'failed' && matchError) {
      setError(true);
    }
  }, [update_match_status, matchError, dispatch]); // Only re-run the effect if update_match_status changes

  useEffect(() => {
    if (delete_match_status === 'success') {
      dispatch(setDeleteMatchStatus(null));
      dispatch(getMatches());
    }
    if (delete_match_status === 'failed' && matchError) {
      setError(true);
    }
  }, [delete_match_status, matchError, dispatch]); // Only re-run the effect if delete_match_status changes

  const handleError = () => {
    setError(false);
    dispatch(setDeleteMatchStatus(null));
    dispatch(setUpdateMatchStatus(null));
    dispatch(setMatchError(null));
    dispatch(setNewMatchStatus(null));
  };

  return (
    <Section
      path='/calendar'
      headerLabel={intl.formatMessage({ id: 'lbl.match-section' })}
      buttonLabel={intl.formatMessage({ id: 'lbl.matches-button-section' })}
    >
      {!loading &&
        matches &&
        matches.slice(0, matchesPerPage).map((match, index) => {
          return <MatchCard key={index + match.id} match={match} />;
        })}
      {loading && Array.from({ length: 3 }).map((_, index) => <MatchesSkeleton key={index} />)}

      {error && (
        <BasicModal
          isError
          open={error}
          onClose={handleError}
          title={matchError && <ErrorDescription error={matchError} />}
          onSubmit={handleError}
          save='btn.ok'
          close='btn.cancel'
        />
      )}
    </Section>
  );
};

export default MatchesSection;
