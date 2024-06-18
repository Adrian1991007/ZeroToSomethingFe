import React, { useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import * as Yup from 'yup';

import { Box, TextField } from '@mui/material';
import countryList from 'react-select-country-list';
import { MenuItem } from '@material-ui/core';

import BasicModal from './BasicModal';
import { STAFF_FLOW } from '../../common/Constants';
import { UploadImage } from '../uploadImage';
import { DatePicker } from '../datePicker';

const StaffModal = ({ open, onClose, content = null, addNewStaffMember, selectedFlow }) => {
  const options = useMemo(() => countryList().getData(), []);
  const intl = useIntl();
  const { staffAgeCategory, staffPosition } = useSelector((state) => state.staff);
  const [isImageSelected, setIsImageSelected] = useState(content ? true : null);

  const disableProfileImageValidations = true;

  const defaultInputValues = {
    profileImage: content ? content.profileImage : '',
    lastName: content ? content.lastName : '',
    firstName: content ? content.firstName : '',
    ageCategory: content
      ? staffAgeCategory.filter((ageCategory) => ageCategory.name == content.ageCategory.name)[0]
      : staffAgeCategory[0],
    dob: content ? content.birthDay : new Date(),
    startPosition: content ? content.position.startTime : new Date(),
    height: content ? content.height : '',
    position: content
      ? staffPosition.filter((position) => position.name === content.position.name)[0]
      : staffPosition[0],
    description: content ? content.description : '',
    nationality: content
      ? options.filter((option) => option.value === content.countryCode)[0]
      : options.filter((option) => option.value === 'RO')[0],
  };

  const [values, setValues] = useState(defaultInputValues);

  const validationSchema = Yup.object().shape({
    lastName: Yup.string().required(
      `${intl.formatMessage({ id: 'lbl.lastName' })} ${intl.formatMessage({
        id: 'lbl.is-required',
      })}`,
    ),
    firstName: Yup.string().required(
      `${intl.formatMessage({ id: 'lbl.firstName' })} ${intl.formatMessage({
        id: 'lbl.is-required',
      })}`,
    ),
    height: Yup.number()
      .required(
        `${intl.formatMessage({ id: 'lbl.staff-height' })} ${intl.formatMessage({
          id: 'lbl.is-height-required',
        })}`,
      )
      .integer(`${intl.formatMessage({ id: 'lbl.height-min-max' })}`)
      .min(50, `${intl.formatMessage({ id: 'lbl.height-min-max' })}`)
      .max(300, `${intl.formatMessage({ id: 'lbl.height-min-max' })}`)
      .typeError(
        `${intl.formatMessage({ id: 'lbl.staff-height' })} ${intl.formatMessage({
          id: 'lbl.is-height-required',
        })}`,
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onTouched',
    defaultValues: defaultInputValues,
    resolver: yupResolver(validationSchema),
  });

  const addStaffMember = () => {
    if (!isImageSelected && !disableProfileImageValidations) {
      setIsImageSelected(false);
      return;
    }

    setIsImageSelected(null);
    addNewStaffMember(values);
  };

  const handleChange = (value) => {
    setValues(value);
  };

  const getContent = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: ['center', 'initial', 'initial'],
        flexDirection: 'column',
        '.MuiFormControl-root': {
          mb: '20px',
        },
      }}
    >
      <UploadImage
        disableValidations={disableProfileImageValidations}
        name='profileImage'
        label='lbl.image'
        values={values}
        setValues={setValues}
        isSelected={isImageSelected}
        setIsSelected={setIsImageSelected}
        errors={errors}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: ['column', 'row', 'row'],
          justifyContent: 'space-evenly',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '20rem',
          }}
        >
          <TextField
            placeholder={intl.formatMessage({ id: 'lbl.lastName' })}
            name='lastName'
            label={intl.formatMessage({ id: 'lbl.lastName' })}
            required
            {...register('lastName')}
            error={errors.lastName ? true : false}
            helperText={errors.lastName?.message}
            value={values.lastName}
            onChange={(event) => handleChange({ ...values, lastName: event.target.value })}
          />

          <TextField
            {...register('ageCategory')}
            name='ageCategory'
            label={intl.formatMessage({ id: 'lbl.ageCategory' })}
            select
            error={errors.ageCategory ? true : false}
            helperText={errors.ageCategory?.message}
            value={values['ageCategory']}
            onChange={(event) => handleChange({ ...values, ageCategory: event.target.value })}
          >
            {staffAgeCategory.map((ageCategory) => (
              <MenuItem key={ageCategory.id} value={ageCategory}>
                {ageCategory.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name='nationality'
            label={intl.formatMessage({ id: 'lbl.nationality' })}
            select
            {...register('nationality')}
            error={errors.nationality ? true : false}
            helperText={errors.nationality?.message}
            value={values['nationality']}
            onChange={(event) => handleChange({ ...values, nationality: event.target.value })}
          >
            {options.map((option) => (
              <MenuItem key={option.label} value={option}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {selectedFlow === STAFF_FLOW.PLAYERS && (
            <TextField
              name='position'
              label={intl.formatMessage({ id: 'lbl.position' })}
              select
              {...register('position')}
              error={errors.position ? true : false}
              helperText={errors.position?.message}
              value={values['position']}
              onChange={(event) => handleChange({ ...values, position: event.target.value })}
            >
              {staffPosition
                .filter((position) => position.id !== 7)
                .map((position) => (
                  <MenuItem key={position.id} value={position}>
                    {position.name}
                  </MenuItem>
                ))}
            </TextField>
          )}

          {selectedFlow === STAFF_FLOW.COACHES && (
            <DatePicker
              label={intl.formatMessage({ id: 'lbl.coach-position-start' })}
              name='startPosition'
              values={values}
              handleChange={handleChange}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '20rem' }}>
          <TextField
            placeholder={intl.formatMessage({ id: 'lbl.firstName' })}
            name='firstName'
            label={intl.formatMessage({ id: 'lbl.firstName' })}
            required
            {...register('firstName')}
            error={errors.firstName ? true : false}
            helperText={errors.firstName?.message}
            value={values.firstName}
            onChange={(event) => handleChange({ ...values, firstName: event.target.value })}
          />

          <DatePicker
            label={intl.formatMessage({ id: 'lbl.staff-dob' })}
            name='dob'
            values={values}
            maxDate={dayjs(new Date())}
            handleChange={handleChange}
          />

          <TextField
            placeholder={intl.formatMessage({ id: 'lbl.staff-height' })}
            name='height'
            label={intl.formatMessage({ id: 'lbl.staff-height-cm' })}
            required
            {...register('height')}
            error={errors.height ? true : false}
            helperText={errors.height?.message}
            value={values.height}
            onChange={(event) => handleChange({ ...values, height: event.target.value })}
          />

          {selectedFlow === STAFF_FLOW.PLAYERS && (
            <DatePicker
              label={intl.formatMessage({ id: 'lbl.position-start' })}
              name='startPosition'
              values={values}
              handleChange={handleChange}
            />
          )}
        </Box>
      </Box>
      <TextField
        sx={{ mx: '6.5rem', maxWidth: ['20rem', '100%', '100%'] }}
        placeholder={intl.formatMessage({ id: 'lbl.staff-description' })}
        name='description'
        label={intl.formatMessage({ id: 'lbl.staff-description' })}
        {...register('description')}
        value={values.description}
        onChange={(event) => handleChange({ ...values, description: event.target.value })}
      />
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title={intl.formatMessage({
        id:
          selectedFlow === STAFF_FLOW.PLAYERS
            ? content
              ? 'lbl.edit-player-member'
              : 'lbl.add-player-member'
            : content
            ? 'lbl.edit-coache-member'
            : 'lbl.add-coache-member',
      })}
      content={getContent()}
      onSubmit={handleSubmit(addStaffMember)}
      save={content ? 'btn.save' : 'btn.add'}
      width='50rem'
      typographyProps={{ textAlign: 'center' }}
    />
  );
};

export default StaffModal;
