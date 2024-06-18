/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';

import { Layout, PageHeader, TrophyTable } from '../../components';
import { TeamBanner } from '../../resources';
import {
  getAgeCategory,
  setStaffError,
  setStaffAgeCategoryStatus,
} from '../../config/redux/slices/StaffSlice';
import { Club_Photo_1 } from '../../resources';
import { Club_Photo_2 } from '../../resources';

const Club = () => {
  const intl = useIntl();
  const theme = useTheme();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const { staffAgeCategory, staff_age_Category_status, staffError } = useSelector(
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
  return (
    <Layout>
      <Box mt='10rem' ml='10rem' position='absolute'>
        <PageHeader
          title={intl.formatMessage({ id: 'lbl.club-page-header' })}
          icon={
            <SportsVolleyballIcon
              fontSize='large'
              sx={{ color: theme.palette._white, border: 'none' }}
            />
          }
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
          flexDirection: 'column',
        }}
        mt='-5rem'
      >
        <Typography
          fontSize='40px'
          color={theme.palette._yellow}
          fontWeight={'bold'}
          ml='5rem'
          my='1rem'
        >
          Viziunea Clubului
        </Typography>
        <Box
          sx={{
            my: ['1rem', '1rem', '1rem', '2rem'],
            mx: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: ['column', 'column', 'column', 'row'],
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: ['column', 'column', 'row', 'row'],
              mx: '1rem',
              width: ['80%', '80%', '80%', '40%'],
            }}
          >
            <img
              style={{
                borderRadius: '20px',
                border: '5px solid #FFBA38',
              }}
              width='100%'
              src={Club_Photo_1}
              alt='CSM Suceava'
            />
          </Box>
          <Typography width='50%' color={theme.palette._yellow} mr='5rem' fontSize='20px'>
            In anul 1972 se infiinteaza Clubul Sportiv Municipal SUCEAVA, initial cu sectiile
            atletism, fotbal, rugby, volei. Ulterior in 1976 s-au adaugat sectiile de lupte
            greco-romane, hochei pe gheata, in 1978 patinaj viteza, in 1979 handbal, in 1981 inot,
            in 1990 baseball si canotaj. Rezultatele bune nu amu intirziat sa apara.
          </Typography>
        </Box>

        <Box
          sx={{
            my: ['1rem', '1rem', '1rem', '2rem'],
            mx: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: ['column', 'column', 'column', 'row'],
          }}
        >
          <Typography width='50%' color={theme.palette._yellow} ml='5rem' fontSize='20px'>
            Chiar din primul an de la infiintare prin promovarea echipei de rugby in divizia A, dar
            si prin alti sportivi ai altor sectii cum ar fi: atletism, lupte, greco-romane, fotbal,
            inot, canotaj si tir cu arcul. Beneficiind de o baza larga de selectie, de antrenori
            valorosi precum si de un management efficient CSM Suceava ajunge unul din cele mai
            importante cluburi sportive din Romania cucerind prin sportivii sai peste 100 de medalii
            internationale si nenumarate medalii nationale.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: ['column', 'column', 'row', 'row'],
              mx: '1rem',
              width: ['80%', '80%', '80%', '40%'],
            }}
          >
            <img
              style={{
                borderRadius: '20px',
                border: '5px solid #FFBA38',
              }}
              width='100%'
              src={Club_Photo_2}
            />
          </Box>
        </Box>
      </Box>

      <Box
        py='2rem'
        mx='2rem'
        backgroundColor='header'
        sx={{
          mt: '1rem',
          display: 'flex',
          flexDirection: ['column', 'column', 'row'],
        }}
        mt='-5rem'
      >
        <TrophyTable />
      </Box>

      <Box
        py='2rem'
        mx='2rem'
        backgroundColor='header'
        sx={{
          mt: '1rem',
          display: 'flex',
          flexDirection: ['column', 'column', 'row'],
        }}
        mt='-5rem'
      ></Box>
    </Layout>
  );
};

export default Club;
