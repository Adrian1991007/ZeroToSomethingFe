import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

import { AdminControls, BasicModal, MatchModal } from '../../components';
import { deleteMatch, updateMatch } from '../../config/redux/slices/MatchesSlice';

const MatchCard = ({ match }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const intl = useIntl();

  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const onMatchEdit = () => {
    setShowModal(true);
  };

  const handleRemove = () => {
    setShowConfirmation(true);
  };

  const handleOnClose = () => {
    setShowModal(false);
  };

  const onConfirmDeleteMatch = () => {
    dispatch(deleteMatch(match.id));
    setShowConfirmation(false);
  };

  const editMatch = (match) => {
    setShowModal(false);
    let matchRequest = {
      id: match.id,
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
    dispatch(updateMatch(matchRequest));
  };

  return (
    <Box
      backgroundColor={theme.palette._white}
      sx={{
        textAlign: 'initial',
        borderRadius: '25px',
        border: '4px solid #c98724',
        width: ['25rem', '35rem', '35rem', '35rem'],
        height: ['19.5rem', '23rem', '23rem', '23rem'],
        as: 'button',
      }}
    >
      <AdminControls
        mb='2rem'
        controlsList={[
          { name: 'edit', onClick: onMatchEdit, iconColor: 'black' },
          { name: 'delete', onClick: handleRemove, iconColor: 'black' },
        ]}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: '-2rem',
        }}
      >
        <Box
          height={['100px', '150px', '150px', '150px']}
          width={['100px', '150px', '150px', '150px']}
          sx={{ mr: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <img
            height='100%'
            width='100%'
            src={match.homeTeamLogo}
            style={{
              border: '5px solid #0F2043',
              borderRadius: '0.5rem',
            }}
            alt='Jucator logo'
          />
          <Typography sx={{ fontSize: '25px' }}>{match.homeTeam}</Typography>
        </Box>

        <Box sx={{ mt: '4rem' }}>
          <Typography fontSize={'25px'} fontWeight='bold'>
            VS
          </Typography>
        </Box>

        <Box
          height={['100px', '150px', '150px', '150px']}
          width={['100px', '150px', '150px', '150px']}
          sx={{ ml: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <img
            height='100%'
            width='100%'
            src={match.awayTeamLogo}
            style={{
              border: '5px solid #0F2043',
              borderRadius: '0.5rem',
            }}
            alt='Jucator logo'
          />
          <Typography sx={{ fontSize: '25px' }}>{match.awayTeam}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          mt: '3rem',
        }}
      >
        <Typography sx={{ mt: '1.5rem', fontSize: '25px', fontWeight: 'bold' }}>
          {match.event}
        </Typography>

        <Typography sx={{ mt: '1rem', textAlign: 'right', fontSize: '25px' }}>
          {dayjs(match.date).format('DD/MM/YYYY')}
        </Typography>
      </Box>
      {showConfirmation && (
        <BasicModal
          isError
          open={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          title={intl.formatMessage({ id: 'lbl.delete-confirmation' })}
          onSubmit={onConfirmDeleteMatch}
          save='btn.ok'
        />
      )}
      {showModal && (
        <MatchModal
          open={showModal}
          onClose={handleOnClose}
          addNewMatch={editMatch}
          content={match}
        />
      )}
    </Box>
  );
};

export default MatchCard;
