/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import ContentLoader from 'react-content-loader';

import Section from '../section/Section';
import { StaffCard } from '../cards';
import { STAFF_FLOW, STAFF_TYPE } from '../../common/Constants';
import { StaffModal, BasicModal, ErrorDescription } from '../modals';
import {
  getAgeCategory,
  setStaffError,
  setStaffStatus,
  getPositions,
  getStaffType,
  setSelectedStaffMember,
  newStaffMember,
  getStaffMembers,
  setStaffAgeCategoryStatus,
  setStaffPositionStatus,
  setStaffTypesStatus,
  setNewStaffStatus,
} from '../../config/redux/slices/StaffSlice';

const StaffSkeleton = () => {
  return (
    <ContentLoader height='20rem' speed={1} backgroundColor='#333' foregroundColor='#999'>
      <rect width='270' height='650' />
    </ContentLoader>
  );
};

const StaffSection = ({ ageCategoryFilter = null }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [selectedFlow, setSelectedFlow] = useState(STAFF_FLOW.PLAYERS);
  const {
    loading,
    staffAgeCategory,
    staffError,
    staffPosition,
    staffTypes,
    staffMembers,
    staff_status,
    new_staff_status,
    staff_types_status,
    staff_position_status,
    staff_age_Category_status,
  } = useSelector((state) => state.staff);

  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [error, setError] = useState(null);

  const onSelectedStaff = (staffMember) => {
    dispatch(setSelectedStaffMember(staffMember));
    setCurrentItem(staffMember);
  };

  useEffect(() => {
    if (!staffMembers && !(staff_status === 'failed')) {
      dispatch(getStaffMembers());
    }
    if (staff_status === 'failed' && staffError) {
      setError(true);
    }
    if (staffMembers && staffError && staff_status === 'failed') {
      dispatch(setStaffError(null));
      dispatch(setStaffStatus(null));
    }
  }, [staffMembers, staff_status, dispatch]); // Only re-run the effect if staff members changes

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
    if (!staffPosition && !(staff_position_status === 'failed')) {
      dispatch(getPositions());
    }
    if (staff_position_status === 'failed' && staffError) {
      setError(true);
    }

    if (staffPosition && staffError && staff_position_status === 'failed') {
      dispatch(setStaffError(null));
      dispatch(setStaffPositionStatus(null));
    }
  }, [staffPosition, staff_position_status, dispatch]); // Only re-run the effect if staffPosition changes

  useEffect(() => {
    if (!staffTypes && !(staff_types_status === 'failed')) {
      dispatch(getStaffType());
    }
    if (staffError && staff_types_status === 'failed') {
      setError(true);
    }

    if (staffTypes && staffError && staff_types_status === 'failed') {
      dispatch(setStaffError(null));
      dispatch(setStaffTypesStatus(null));
    }
  }, [staffTypes, staff_types_status, dispatch]); // Only re-run the effect if staffTypes changes

  useEffect(() => {
    if (staffError && new_staff_status === 'failed') {
      setError(true);
    }

    if (new_staff_status === 'success') {
      dispatch(getStaffMembers());
      dispatch(setNewStaffStatus(null));
    }
  }, [staffError, new_staff_status, dispatch]); // Only re-run the effect if staffTypes changes

  const onAddClick = () => {
    setShowModal(true);
  };

  const handleOnClose = () => {
    setShowModal(false);
    setCurrentItem(null);
  };

  const addNewStaffMember = (staffMember) => {
    let staffRequest = {};
    setShowModal(false);
    if (selectedFlow === STAFF_FLOW.PLAYERS) {
      staffRequest = {
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
    dispatch(newStaffMember(staffRequest));
  };

  const handleError = () => {
    setError(false);
    dispatch(setStaffError(null));
    dispatch(setNewStaffStatus(null));
  };

  return (
    <Section
      isStaff
      path='/echipa'
      headerLabel={intl.formatMessage({ id: 'lbl.players' })}
      buttonLabel={intl.formatMessage({ id: 'lbl.coaches' })}
      selectedFlow={selectedFlow}
      setSelectedFlow={setSelectedFlow}
      onAddClick={onAddClick}
    >
      {loading && Array.from({ length: 10 }).map((_, index) => <StaffSkeleton key={index} />)}

      {!loading && selectedFlow === STAFF_FLOW.PLAYERS
        ? staffMembers
            ?.filter((member) => member.staffType.id == STAFF_TYPE.PLAYERS)
            .filter((player) => {
              if (ageCategoryFilter) return player.ageCategory.name === ageCategoryFilter;
              return player;
            })
            .map((player, index) => {
              return (
                <StaffCard
                  key={index + player.id}
                  staffMember={player}
                  onSelected={onSelectedStaff}
                />
              );
            })
        : staffMembers
            ?.filter((member) => member.staffType.id == STAFF_TYPE.COACHES)
            .filter((coache) => {
              if (ageCategoryFilter) return coache.ageCategory.name === ageCategoryFilter;
              return coache;
            })
            .map((coache, index) => {
              return (
                <StaffCard
                  key={index + coache.id}
                  staffMember={coache}
                  onSelected={onSelectedStaff}
                />
              );
            })}

      {showModal && (
        <StaffModal
          open={showModal}
          onClose={handleOnClose}
          addNewStaffMember={addNewStaffMember}
          content={currentItem}
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
    </Section>
  );
};

export default StaffSection;
