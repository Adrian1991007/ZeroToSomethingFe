/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';

import { Box, Typography } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';

import {
  Layout,
  Section,
  PageHeader,
  BasicModal,
  MatchModal,
  ErrorDescription,
  HorizontalFilter,
  Pagination,
  MatchCard,
} from '../../components';
import { TeamBanner } from '../../resources';
import {
  getMatches,
  getMatchTypes,
  newMatch,
  setMatchTypeStatus,
  setNewMatchStatus,
  setSelectedMatch,
  setMatchError,
  setUpdateMatchStatus,
  setDeleteMatchStatus,
  setMatchStatus,
} from '../../config/redux/slices/MatchesSlice';
import {
  getAgeCategory,
  setStaffError,
  setStaffAgeCategoryStatus,
} from '../../config/redux/slices/StaffSlice';
import { MatchesSkeleton } from '../../components/skeletons';

const Calendar = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { staffAgeCategory, staff_age_Category_status, staffError } = useSelector(
    (state) => state.staff,
  );
  const {
    loading,
    matches,
    match_Status,
    matchError,
    matchTypes,
    update_match_status,
    delete_match_status,
    match_type_status,
  } = useSelector((state) => state.matches);

  const [currentPage, setCurrentPage] = useState(1);
  const [matchesPerPage] = useState(6);
  const [currentItem, setCurrentItem] = useState(null);

  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = matches?.slice(indexOfFirstMatch, indexOfLastMatch);

  const createTeamsFilters = (staffAgeCategory) => {
    const filter = [
      {
        label: intl.formatMessage({ id: 'lbl.add-match-ageCategoryId' }),
        placeHolder: 'Selectati categoria',
      },
    ];
    if (!staffAgeCategory) {
      return filter;
    }
    const editions = [];
    staffAgeCategory.map((ageCategory) => {
      const newEdition = { id: ageCategory.name };

      editions.push(newEdition);
    });
    filter[0].editions = editions;
    return filter;
  };

  const teamsFilters = useMemo(() => createTeamsFilters(staffAgeCategory), [staffAgeCategory]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedFiltersNewMatches, setSelectedFiltersNewMatches] = useState({});

  useEffect(() => {
    if (!matches && !(match_Status === 'failed')) {
      dispatch(getMatches());
    }
    if (match_Status === 'failed' && matchError) {
      setMatchError(true);
    }
    if (matches && matchError && match_Status === 'failed') {
      dispatch(setMatchError(null));
      dispatch(setMatchStatus(null));
    }
  }, [matches, match_Status, dispatch]); // Only re-run the effect if matches changes

  useEffect(() => {
    if (!staffAgeCategory && !(staff_age_Category_status === 'failed')) {
      dispatch(getAgeCategory());
    }
    if (staff_age_Category_status === 'failed' && staffError) {
      setError(true);
    }

    if (staffAgeCategory && staffError && staff_age_Category_status === 'failed') {
      dispatch(setStaffError(null));
      dispatch(setStaffAgeCategoryStatus(null));
    }
  }, [staffAgeCategory, staff_age_Category_status, dispatch]); // Only re-run the effect if staffAgeCategory changes

  useEffect(() => {
    if (!matchTypes && !(match_type_status === 'failed')) {
      dispatch(getMatchTypes());
    }
    if (match_type_status === 'failed' && matchError) {
      setMatchError(true);
    }
    if (matchTypes && matchError && match_type_status === 'failed') {
      dispatch(setMatchError(null));
      dispatch(setMatchTypeStatus(null));
    }
  }, [matchTypes, match_type_status, dispatch]); // Only re-run the effect if matchType changes

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

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onSelectedMatches = (match) => {
    dispatch(setSelectedMatch(match));
    setCurrentItem(match);
  };

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const onAddClick = () => {
    setShowModal(true);
  };

  const handleOnClose = () => {
    setShowModal(false);
  };
  const addNewMatch = (match) => {
    setShowModal(false);
    let matchRequest = {
      event: match.event,
      date: dayjs(match.date).format('YYYY-MM-DD'),
      location: match.location,
      link: match.link,
      homeTeam: match.homeTeam,
      homeTeamLogo: match.homeTeamLogo,
      awayTeam: match.awayTeam,
      awayTeamLogo: match.awayTeamLogo,
      homeTeamScore: parseInt(match.homeTeamScore),
      awayTeamScore: parseInt(match.awayTeamScore),
      matchTypeId: match.matchType.id,
      ageCategoryId: match.ageCategory.id,
    };

    dispatch(newMatch(matchRequest));
  };

  return (
    <Layout>
      <Box mt='10rem' ml='10rem' position='absolute'>
        <PageHeader
          title={intl.formatMessage({ id: 'lbl.match-page-header' })}
          icon={<NewspaperIcon fontSize='large' sx={{ color: 'white', border: 'none' }} />}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', overflowX: 'hidden' }}>
        <img
          width='1982px'
          height='400px'
          src={TeamBanner}
          alt={intl.formatMessage({ id: 'lbl.alt-image-match' })}
        />
      </Box>

      <Section isNews isStaff onAddClick={onAddClick}>
        <Box
          sx={{
            width: '90%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: ['column', 'column', 'column', 'row'],
              alignItems: 'center',
            }}
          >
            <Typography
              color={theme.palette._yellow}
              sx={{
                minWidth: '195px',
                mr: ['0rem', '0rem', '0rem', '0.5rem'],
                fontSize: '30px',
              }}
            >
              {intl.formatMessage({ id: 'lbl.calendar_played_games' })}
            </Typography>
            <Box width='100%'>
              <HorizontalFilter
                title={intl.formatMessage({ id: 'lbl.age-category-team' })}
                filters={teamsFilters}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
            </Box>
          </Box>
        </Box>
        {!loading &&
          currentMatches &&
          currentMatches
            .filter((match) =>
              selectedFilters[intl.formatMessage({ id: 'lbl.add-match-ageCategoryId' })]
                ? match.ageCategory.name ===
                  selectedFilters[intl.formatMessage({ id: 'lbl.add-match-ageCategoryId' })]
                : match,
            )
            .filter((match) => new Date(match.date) < new Date())
            .slice(0, matchesPerPage)
            .map((match, index) => {
              return (
                <MatchCard key={index + match.id} match={match} onSelected={onSelectedMatches} />
              );
            })}
        {loading && Array.from({ length: 6 }).map((_, index) => <MatchesSkeleton key={index} />)}
        <Pagination
          contentPerPage={matchesPerPage}
          numberOfPages={matches?.length}
          paginate={paginate}
        />
      </Section>

      <Section isNews isStaff onAddClick={onAddClick}>
        <Box
          sx={{
            width: '90%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: ['column', 'column', 'column', 'row'],
              alignItems: 'center',
            }}
          >
            <Typography
              color={theme.palette._yellow}
              sx={{
                minWidth: '280px',
                mr: ['0rem', '0rem', '0rem', '0.5rem'],
                fontSize: '30px',
              }}
            >
              {intl.formatMessage({ id: 'lbl.calendar_future_games' })}
            </Typography>
            <Box width='100%'>
              <HorizontalFilter
                title={intl.formatMessage({ id: 'lbl.age-category-team' })}
                filters={teamsFilters}
                selectedFilters={selectedFiltersNewMatches}
                setSelectedFilters={setSelectedFiltersNewMatches}
              />
            </Box>
          </Box>
        </Box>
        {!loading &&
          currentMatches &&
          currentMatches
            .filter((match) =>
              selectedFiltersNewMatches[intl.formatMessage({ id: 'lbl.add-match-ageCategoryId' })]
                ? match.ageCategory.name ===
                  selectedFiltersNewMatches[
                    intl.formatMessage({ id: 'lbl.add-match-ageCategoryId' })
                  ]
                : match,
            )
            .filter((match) => new Date(match.date) > new Date())
            .slice(0, matchesPerPage)
            .map((match, index) => {
              return (
                <MatchCard key={index + match.id} match={match} onSelected={onSelectedMatches} />
              );
            })}
        {loading && Array.from({ length: 6 }).map((_, index) => <MatchesSkeleton key={index} />)}
        <Pagination
          contentPerPage={matchesPerPage}
          numberOfPages={matches?.length}
          paginate={paginate}
        />
      </Section>
      {showModal && (
        <MatchModal
          open={showModal}
          onClose={handleOnClose}
          addNewMatch={addNewMatch}
          content={currentItem}
        />
      )}

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
    </Layout>
  );
};

export default Calendar;
