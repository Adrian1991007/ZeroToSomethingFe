import React, { useState, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { TeamBanner } from '../../resources';
import {
  Layout,
  StaffSection,
  PageHeader,
  BasicModal,
  ErrorDescription,
  HorizontalFilter,
} from '../../components';

import {
  getAgeCategory,
  setStaffError,
  setStaffAgeCategoryStatus,
} from '../../config/redux/slices/StaffSlice';

const Teams = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const { staffAgeCategory, staffError, staff_age_Category_status } = useSelector(
    (state) => state.staff,
  );

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

  const createTeamsFilters = (staffAgeCategory) => {
    const filter = [
      {
        label: 'Categoria de varsta',
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

  const handleError = () => {
    setError(false);
    dispatch(setStaffError(null));
  };

  return (
    <Layout>
      <Box mt='10rem' ml='10rem' position='absolute'>
        <PageHeader
          title={intl.formatMessage({ id: 'lbl.teams-page-header' })}
          icon={<PeopleAltIcon fontSize='large' sx={{ color: 'white', border: 'none' }} />}
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
      <Box
        py='2rem'
        mx='2rem'
        backgroundColor='header'
        sx={{
          mt: '1rem',
          display: 'flex',
          flexDirection: ['column', 'column', 'column'],
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '90%',
          }}
        >
          <HorizontalFilter
            title={intl.formatMessage({ id: 'lbl.age-category-team' })}
            filters={teamsFilters}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </Box>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <StaffSection ageCategoryFilter={Object.values(selectedFilters)[0]} />
        </Box>
      </Box>
      {error && (
        <BasicModal
          isError
          open={error}
          onClose={handleError}
          title={staffError && <ErrorDescription error={staffError} />}
          onSubmit={handleError}
          save='btn.ok'
          close='btn.cancel'
        />
      )}
    </Layout>
  );
};

export default Teams;
