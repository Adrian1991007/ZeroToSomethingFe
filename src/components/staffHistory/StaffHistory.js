import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import ContentLoader from 'react-content-loader';
import dayjs from 'dayjs';

import { Box, Grid, Typography } from '@mui/material';

import { AdminControls, ZTSIcon } from '../../components';
import { BasicModal, ErrorDescription } from '../modals';

import {
  setStaffError,
  getStaffPositionHistory,
  setStaffPositionHistoryStatus,
  deleteLastPosition,
  setDeleteLastPositionStatus,
} from '../../config/redux/slices/StaffSlice';

const HistoryPositionSkeleton = () => {
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

const StaffHistory = ({ staffID }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState(null);

  const {
    staffPositionsHistory,
    staffError,
    staff_position_history_status,
    delete_last_position_status,
  } = useSelector((state) => state.staff);

  const handleRemove = () => {
    setShowConfirmation(true);
  };

  const onConfirmDeleteHistory = () => {
    dispatch(deleteLastPosition(staffID));
    setShowConfirmation(false);
  };

  const handleError = () => {
    setError(false);
    dispatch(setStaffError(null));
    dispatch(setDeleteLastPositionStatus(null));
  };

  useEffect(() => {
    if (
      (!staffPositionsHistory && !staff_position_history_status) ||
      (staffPositionsHistory && staffID !== staffPositionsHistory?.staffId)
    ) {
      dispatch(getStaffPositionHistory({ staffID: staffID }));
    }
    if (staff_position_history_status === 'failed' && staffError) {
      setError(true);
    }

    if (staff_position_history_status === 'success') {
      dispatch(setStaffPositionHistoryStatus(null));
    }

    if (staffPositionsHistory && staffError && staff_position_history_status === 'failed') {
      dispatch(setStaffError(null));
      dispatch(setStaffPositionHistoryStatus(null));
    }
  }, [staffPositionsHistory, staffError, dispatch]); // Only re-run the effect if staffMemberHistory changes

  useEffect(() => {
    if (delete_last_position_status === 'success') {
      dispatch(getStaffPositionHistory({ staffID: staffID }));
      dispatch(setDeleteLastPositionStatus(null));
    }
    if (delete_last_position_status === 'failed' && staffError) {
      setError(true);
    }
  }, [delete_last_position_status, staffError, dispatch]); // Only re-run the effect if delete_last_position_status changes

  const HistoryPosition = ({ icon, positionHistory }) => {
    if (!positionHistory) return;
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
        <Typography color='white' ml='0.5rem'>
          {positionHistory.position.name}
        </Typography>
        <Typography color='white' ml='0.5rem'>
          {dayjs(positionHistory.startTime).format('DD/MM/YYYY')}
          {positionHistory.endTime
            ? ` - ${dayjs(positionHistory.endTime).format('DD/MM/YYYY')}`
            : ` - ${intl.formatMessage({ id: 'lbl.present' })}`}
        </Typography>
      </Box>
    );
  };

  return (
    <>
      <Box>
        <Grid
          sx={{
            backgroundColor: 'header',
            pl: '2rem',
            pb: '2rem',
          }}
        >
          <AdminControls controlsList={[{ name: 'delete', onClick: handleRemove }]} />

          <Typography variant='h4' color='white'>
            {intl.formatMessage({ id: 'lbl.history' })}
          </Typography>
          <Box ml='7rem'>
            {staff_position_history_status !== 'loading' &&
              staffPositionsHistory?.positionHistory.map((position, index) => {
                return <HistoryPosition key={index} icon='volleyball' positionHistory={position} />;
              })}
            {staff_position_history_status === 'loading' && <HistoryPositionSkeleton />}
          </Box>
        </Grid>

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
            title={intl.formatMessage({ id: 'lbl.history-delete-confirmation' })}
            onSubmit={onConfirmDeleteHistory}
            save='btn.ok'
          />
        )}
      </Box>
    </>
  );
};

export default StaffHistory;
