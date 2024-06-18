import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';

import dayjs from 'dayjs';

import { Box, Grid, Typography } from '@mui/material';

import {
  Layout,
  AdminControls,
  StaffHistory,
  StaffModal,
  StaffTrophy,
  PageHeader,
  ErrorDescription,
  BasicModal,
} from '../../components';
import { TeamBanner, profileImage } from '../../resources';
import { getStaffMemberFullName } from '../../common/Utilities';
import { STAFF_FLOW, STAFF_TYPE } from '../../common/Constants';

import {
  setStaffError,
  updateStaffMember,
  deleteStaffMember,
  setUpdateStaffStatus,
  getStaffMembers,
  setSelectedStaffMember,
  setStaffPositionsHistory,
} from '../../config/redux/slices/StaffSlice';

const PlayerDescription = ({ label, content, ...props }) => {
  return (
    <Box
      sx={{
        diplay: 'flex',
        flexDirection: 'column',
        mt: '1rem',
        ...props,
      }}
    >
      <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>{label}</Typography>
      <Typography sx={{ color: 'white', fontSize: '17px' }}>{content}</Typography>
    </Box>
  );
};

const Nationality = ({ label, staffMember }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: '1rem' }}>
      <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>{label}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography sx={{ color: 'white', mr: '0.5rem', fontSize: '17px' }}>
          {staffMember?.country}
        </Typography>
        <ReactCountryFlag
          countryCode={staffMember?.countryCode}
          svg
          style={{
            width: '2em',
            height: '2em',
          }}
          title={staffMember?.countryCode}
        />
      </Box>
    </Box>
  );
};

const Staff = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const intl = useIntl();
  const { selectedStaffMember, staffError, update_staff_status, staffMembers } = useSelector(
    (state) => state.staff,
  );
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState(null);

  const selectedFlow =
    selectedStaffMember?.staffType?.id == STAFF_TYPE.PLAYERS
      ? STAFF_FLOW.PLAYERS
      : STAFF_FLOW.COACHES;

  useEffect(() => {
    if (!selectedStaffMember) navigate('/');
  }, [selectedStaffMember]);

  const onPlayerEdit = () => {
    setShowModal(true);
  };

  const handleRemove = () => {
    setShowConfirmation(true);
  };

  const onConfirmDeleteStaff = () => {
    dispatch(deleteStaffMember(selectedStaffMember.id));
    navigate('/');
    setShowConfirmation(false);
  };

  const handleOnClose = () => {
    setShowModal(false);
  };

  const handleError = () => {
    setError(false);
    dispatch(setStaffError(null));
    dispatch(setUpdateStaffStatus(null));
  };

  const editStaffMember = (staffMember) => {
    setShowModal(false);
    let staffRequest = {};
    if (selectedFlow === STAFF_FLOW.PLAYERS) {
      staffRequest = {
        id: selectedStaffMember.id,
        lastName: staffMember.lastName,
        firstName: staffMember.firstName,
        birthDay: dayjs(staffMember.dob).format('YYYY-MM-DD'),
        height: parseInt(staffMember.height),
        description: staffMember.description,
        profileImage: staffMember.profileImage,
        country: staffMember.nationality.label,
        countryCode: staffMember.nationality.value,
        ageCategoryId: staffMember.ageCategory.id,
        staffTypeId: STAFF_TYPE.PLAYERS,
        position: {
          id: staffMember.position.id,
          startTime: dayjs(staffMember.startPosition).format('YYYY-MM-DD'),
        },
      };
    } else {
      staffRequest = {
        id: selectedStaffMember.id,
        lastName: staffMember.lastName,
        firstName: staffMember.firstName,
        birthDay: dayjs(staffMember.dob).format('YYYY-MM-DD'),
        height: parseInt(staffMember.height),
        description: staffMember.description,
        profileImage: staffMember.profileImage,
        country: staffMember.nationality.label,
        countryCode: staffMember.nationality.value,
        ageCategoryId: staffMember.ageCategory.id,
        staffTypeId: STAFF_TYPE.COACHES,
        position: {
          id: 0,
          startTime: dayjs(staffMember.startPosition).format('YYYY-MM-DD'),
        },
      };
    }
    dispatch(updateStaffMember(staffRequest));
  };

  useEffect(() => {
    if (update_staff_status === 'success') {
      dispatch(setUpdateStaffStatus(null));
      dispatch(getStaffMembers());
    }
    if (update_staff_status === 'failed' && staffError) {
      setError(true);
    }
  }, [update_staff_status, staffError, dispatch]); // Only re-run the effect if delete_last_position_status changes

  useEffect(() => {
    dispatch(
      setSelectedStaffMember(
        staffMembers?.filter((staff) => staff.id === selectedStaffMember?.id)[0],
      ),
    );
    dispatch(setStaffPositionsHistory(null));
  }, [staffMembers, dispatch]); // Only re-run the effect if delete_last_position_status changes

  useEffect(() => {
    if (!selectedStaffMember) navigate('/');
  }, [selectedStaffMember]);

  return (
    <Layout>
      <Box mt='8rem' ml='8rem' position='absolute'>
        <PageHeader
          title={getStaffMemberFullName(selectedStaffMember)}
          titleProps={{ fontSize: 38 }}
          sx={{ position: 'absolute' }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', overflowX: 'hidden' }}>
        <img
          width='1982px'
          height='400px'
          src={TeamBanner}
          alt={intl.formatMessage({ id: 'lbl.alt-image-staff' })}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mx: '2rem',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: ['column', 'column', 'column', 'row-reverse'],
          }}
        >
          <Box
            sx={{
              width: ['250px', '300px', '400px', '500px'],
              height: ['250px', '300px', '400px', '500px'],
              mt: '-13rem',
              mx: 'auto',
            }}
          >
            <img
              width='100%'
              height='100%'
              src={
                selectedStaffMember?.profileImage?.length > 0
                  ? selectedStaffMember?.profileImage
                  : profileImage
              }
              style={{
                borderRadius: '50%',
                border: '5px solid #0F2043',
              }}
              alt='Jucator logo'
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              mt: '1rem',
              backgroundColor: 'header',
              flexDirection: 'column',
              width: ['100%', '100%', '100%', '60%'],
              pl: '8rem',
              pb: '2rem',
            }}
          >
            <AdminControls
              controlsList={[
                { name: 'edit', onClick: onPlayerEdit },
                { name: 'delete', onClick: handleRemove },
              ]}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: ['column', 'row', 'row', 'row'],
                width: '100%',
                ml: ['-4rem', '-4rem', '-2rem', '-2rem'],
                overflowWrap: 'break-word',
              }}
            >
              <Grid
                container
                direction='column'
                sx={{ overflowWrap: 'anywhere', pr: '1rem', mb: ['1rem', '0rem', '0rem', '0rem'] }}
              >
                <Nationality
                  label={intl.formatMessage({ id: 'lbl.staff-nationality' })}
                  staffMember={selectedStaffMember}
                />
                <PlayerDescription
                  label={intl.formatMessage({ id: 'lbl.age-category' })}
                  content={selectedStaffMember?.ageCategory?.name}
                />
                <PlayerDescription
                  label={intl.formatMessage({ id: 'lbl.description' })}
                  content={selectedStaffMember?.description}
                />
              </Grid>
              <Grid container direction='column' sx={{ mt: ['1rem', '0rem', '0rem', '0rem'] }}>
                <PlayerDescription
                  label={intl.formatMessage({ id: 'lbl.dob' })}
                  content={dayjs(selectedStaffMember?.birthDay).format('DD/MM/YYYY')}
                />
                <PlayerDescription
                  label={intl.formatMessage({ id: 'lbl.height' })}
                  content={selectedStaffMember?.height}
                />
                {selectedStaffMember?.staffType?.id === STAFF_TYPE.PLAYERS && (
                  <PlayerDescription
                    label={intl.formatMessage({ id: 'lbl.position' })}
                    content={selectedStaffMember?.position?.name}
                  />
                )}
              </Grid>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            mt: '1.5rem',
            width: '100%',
            flexDirection: ['column', 'column', 'column', 'row'],
            itemsAlign: 'center',
            textAlign: 'center',
          }}
        >
          <Box sx={{ width: ['100%', '100%', '100%', '50%'], mr: ['0', '0', '0', '1rem'] }}>
            {selectedStaffMember?.id && <StaffHistory staffID={selectedStaffMember?.id} />}
          </Box>
          <Box sx={{ width: ['100%', '100%', '100%', '50%'], ml: ['0', '0', '0', '1rem'] }}>
            <StaffTrophy />
          </Box>
        </Box>
      </Box>
      {showModal && (
        <StaffModal
          open={showModal}
          onClose={handleOnClose}
          addNewStaffMember={editStaffMember}
          content={selectedStaffMember}
          selectedFlow={selectedFlow}
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
          onSubmit={onConfirmDeleteStaff}
          save='btn.ok'
        />
      )}
    </Layout>
  );
};

export default Staff;
