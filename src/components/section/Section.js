import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Box, Typography, Grid, LinearProgress } from '@mui/material';

import ZTSIcon from '../icons';
import { STAFF_FLOW } from '../../common/Constants';
import AdminControls from '../adminControls/AdminControls';

const Section = ({
  children,
  headerLabel,
  buttonLabel,
  path,
  isStaff,
  isNews = false,
  setSelectedFlow,
  selectedFlow,
  onAddClick,
}) => {
  const progressValue = 100;
  let navigate = useNavigate();

  return (
    <Grid
      sx={{
        mt: '1rem',
        mx: '2rem',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'header',
      }}
    >
      {isStaff ? (
        <Box mt='1rem' sx={{ display: 'flex', mb: headerLabel ? '0' : '1.5rem' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Grid container sx={{ justifyContent: 'center', width: '5rem' }}>
              <Button
                variant={
                  selectedFlow === STAFF_FLOW.PLAYERS ? 'selectedStaffButtons' : 'staffButtons'
                }
                onClick={() => setSelectedFlow(STAFF_FLOW.PLAYERS)}
              >
                {headerLabel}
              </Button>
              <LinearProgress
                sx={{
                  visibility: selectedFlow === STAFF_FLOW.PLAYERS ? 'initial' : 'hidden',
                  width: '50px',
                }}
                variant='determinate'
                value={progressValue}
              />
            </Grid>

            <Grid container sx={{ justifyContent: 'center', width: '5rem' }}>
              <Button
                variant={
                  selectedFlow === STAFF_FLOW.COACHES ? 'selectedStaffButtons' : 'staffButtons'
                }
                onClick={() => setSelectedFlow(STAFF_FLOW.COACHES)}
              >
                {buttonLabel}
              </Button>
              <LinearProgress
                sx={{
                  visibility: selectedFlow === STAFF_FLOW.COACHES ? 'initial' : 'hidden',
                  width: '50px',
                }}
                variant='determinate'
                value={progressValue}
              />
            </Grid>
          </Box>
          <AdminControls
            isNews={isNews}
            position='absolute'
            right={0}
            mt={0}
            mr='70px'
            controlsList={[{ name: 'add', onClick: onAddClick }]}
          />
        </Box>
      ) : (
        <Grid
          container
          direction={['column', 'row']}
          sx={{
            display: ['contents', 'flex', 'flex'],
            width: '100%',
            justifyContent: 'space-between',
          }}
          mt={['0', '1rem']}
          pr={['0', '2rem']}
          pl='3rem'
        >
          {headerLabel && (
            <Typography mt='1rem' textAlign={'center'} color='white'>
              {headerLabel}
            </Typography>
          )}

          {buttonLabel && (
            <Button
              variant='navbarButtons'
              onClick={() => navigate(path)}
              endIcon={
                <Box mt='1rem'>
                  <ZTSIcon name={'chevronRight'} />
                </Box>
              }
            >
              {buttonLabel}
            </Button>
          )}
        </Grid>
      )}

      <Grid
        container
        rowSpacing={2}
        pt='1.5rem'
        pb='2rem'
        px='1rem'
        gridTemplateRows='repeat(2, 1fr)'
        gridTemplateColumns='repeat(12, 1fr)'
        gap={4}
        sx={{ justifyContent: 'center' }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default Section;
