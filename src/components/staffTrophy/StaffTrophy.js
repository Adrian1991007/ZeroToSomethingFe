import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import ContentLoader from 'react-content-loader';
import dayjs from 'dayjs';

import { Box, Grid, Typography } from '@mui/material';

import { AdminControls, ZTSIcon } from '../../components';
import { TrophyModal, BasicModal, ErrorDescription } from '../modals';

import {
  setStaffError,
  getStaffPositionHistory,
  deleteStaffTrophy,
  setDeleteTrophyStatus,
  getStaffTrophies,
  setStaffTrophiesStatus,
  newStaffTrophy,
  setNewTrophyStatus,
} from '../../config/redux/slices/StaffSlice';

const TrophySkeleton = () => {
  return (
    <Box display='flex' sx={{ mt: '1.5rem' }}>
      <ContentLoader
        height='18px'
        width='350px'
        speed={1}
        backgroundColor='#333'
        foregroundColor='#999'
      >
        <rect width='350' height='18' />
      </ContentLoader>
    </Box>
  );
};

const StaffHistory = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrophy, setSelectedTrophy] = useState(null);
  const [error, setError] = useState(null);

  const {
    staffPositionsHistory,
    staffError,
    staff_position_history_status,
    delete_trophy_status,
    staffTrophies,
    staff_trophies_status,
    new_trophy_status,
  } = useSelector((state) => state.staff);

  useEffect(() => {
    if (delete_trophy_status === 'success') {
      dispatch(getStaffPositionHistory({ staffID: staffPositionsHistory.staffId }));
      dispatch(setDeleteTrophyStatus(null));
    }
    if (delete_trophy_status === 'failed' && staffError) {
      setError(true);
    }
  }, [delete_trophy_status, staffError, dispatch]); // Only re-run the effect if delete_last_position_status changes

  useEffect(() => {
    if (!staffTrophies && !(staff_trophies_status === 'failed')) {
      dispatch(getStaffTrophies());
    }
    if (staff_trophies_status === 'failed' && staffError) {
      setError(true);
    }
    if (staffTrophies && staffError && staff_trophies_status === 'failed') {
      dispatch(setStaffError(null));
      dispatch(setStaffTrophiesStatus(null));
    }
  }, [staffTrophies, staff_trophies_status, dispatch]); // Only re-run the effect if staffTrophies changes

  useEffect(() => {
    if (new_trophy_status === 'success') {
      dispatch(getStaffPositionHistory({ staffID: staffPositionsHistory.staffId }));
      dispatch(setNewTrophyStatus(null));
    }
    if (new_trophy_status === 'failed' && staffError) {
      setError(true);
    }
  }, [new_trophy_status, staffError, dispatch]); // Only re-run the effect if delete_last_position_status changes

  const handleRemove = (staffPositionHistoryId, trophyId) => {
    setShowConfirmation(true);
    const obj = {
      staffPositionHistoryId: staffPositionHistoryId,
      trophyId: trophyId,
    };
    setSelectedTrophy(obj);
  };

  const handleAdd = () => {
    setShowModal(true);
  };

  const onConfirmDeleteTrophy = () => {
    dispatch(deleteStaffTrophy(selectedTrophy));
    setShowConfirmation(false);
    setSelectedTrophy(null);
  };

  const handleError = () => {
    setError(false);
    dispatch(setStaffError(null));
    dispatch(setDeleteTrophyStatus(null));
  };

  const handleOnClose = () => {
    setShowModal(false);
  };

  const addNewTrophy = (newTrophy) => {
    const trophyRequest = {
      staffPositionId: newTrophy.positionsHistory.id,
      trophyId: newTrophy.trophy.id,
      acquiredDate: dayjs(newTrophy.acquiredDate).format('YYYY-MM-DD'),
    };
    setShowModal(false);
    dispatch(newStaffTrophy(trophyRequest));
  };

  const TrophyContent = ({ icon, trophy, positionHistory }) => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          ml: ['-8rem', '4rem', '4rem', '0'],
          mt: '1.5rem',
        }}
      >
        <ZTSIcon name={icon} />
        <Typography color='white' mx='0.5rem'>
          {`${trophy.name} -- ${dayjs(trophy.acquiredDate).format('DD/MM/YYYY')} --  ${
            positionHistory.position.name
          }`}
        </Typography>

        <AdminControls
          mt='0'
          controlsList={[
            {
              name: 'delete',
              onClick: () => handleRemove(positionHistory.id, trophy.id),
            },
          ]}
        />
      </Box>
    );
  };

  return (
    <>
      <Box>
        <Grid
          sx={{
            pl: '2rem',
            backgroundColor: 'header',
            pb: '2rem',
          }}
        >
          <AdminControls controlsList={[{ name: 'add', onClick: handleAdd }]} />

          <Typography variant='h4' color='white'>
            {intl.formatMessage({ id: 'lbl.staff-trophy' })}
          </Typography>
          <Box ml='7rem'>
            {staff_position_history_status !== 'loading' &&
              staffPositionsHistory?.positionHistory?.map((positionHistory) => {
                return positionHistory.trophies.map((trophy, index) => {
                  return (
                    <TrophyContent
                      key={index}
                      icon='volleyball'
                      trophy={trophy}
                      positionHistory={positionHistory}
                    />
                  );
                });
              })}
            {staff_position_history_status === 'loading' && <TrophySkeleton />}
          </Box>
        </Grid>

        {showModal && (
          <TrophyModal
            open={showModal}
            onClose={handleOnClose}
            addNewTrophy={addNewTrophy}
            positionsHistory={staffPositionsHistory?.positionHistory}
            staffTrophies={staffTrophies}
          />
        )}

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

        {showConfirmation && (
          <BasicModal
            isError
            open={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            title={intl.formatMessage({ id: 'lbl.delete-confirmation' })}
            onSubmit={onConfirmDeleteTrophy}
            save='btn.ok'
          />
        )}
      </Box>
    </>
  );
};

export default StaffHistory;
