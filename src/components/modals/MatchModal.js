import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Box, TextField } from '@mui/material';
import { MenuItem } from '@material-ui/core';

import { UploadImage } from '../uploadImage';
import { DatePicker } from '../datePicker';

import BasicModal from './BasicModal';

const MatchModal = ({ open, onClose, content = null, addNewMatch }) => {
  const intl = useIntl();

  const { staffAgeCategory } = useSelector((state) => state.staff);
  const { matchTypes } = useSelector((state) => state.matches);
  const disableValidations = content ? true : false;

  const defaultInputValues = {
    id: content ? content.id : '',
    event: content ? content.event : '',
    date: content ? content.date : new Date(),
    location: content ? content.location : '',
    link: content ? content.link : '',
    homeTeam: content ? content.homeTeam : '',
    homeTeamLogo: content ? content.homeTeamLogo : '',
    awayTeam: content ? content.awayTeam : '',
    awayTeamLogo: content ? content.awayTeamLogo : '',
    homeTeamScore: content ? content.homeTeamScore : 0,
    awayTeamScore: content ? content.awayTeamScore : 0,
    matchType: content
      ? matchTypes?.filter((matchType) => matchType.name == content.matchType.name)[0]
      : matchTypes
      ? matchTypes[0]
      : [],
    ageCategory: content
      ? staffAgeCategory?.filter((ageCategory) => ageCategory.name == content.ageCategory.name)[0]
      : staffAgeCategory
      ? staffAgeCategory[0]
      : [],
  };

  const [values, setValues] = useState(defaultInputValues);

  const [isFirstImageSelected, setIsFirstImageSelected] = useState(
    values['homeTeamLogo'].length > 0 ? true : null,
  );
  const [isSecoundImageSelected, setIsSecoundImageSelected] = useState(
    values['awayTeamLogo'].length > 0 ? true : null,
  );

  const validationSchema = Yup.object().shape({
    event: Yup.string()
      .required(
        `${intl.formatMessage({ id: 'lbl.event-required' })} ${intl.formatMessage({
          id: 'lbl.is-required',
        })}`,
      )
      .min(
        4,
        `${intl.formatMessage({ id: 'lbl.event-required' })} ${intl.formatMessage({
          id: 'lbl.have-min',
        })}`,
      ),
    location: Yup.string().required(
      `${intl.formatMessage({ id: 'lbl.add-match-location' })} ${intl.formatMessage({
        id: 'lbl.is-height-required',
      })}`,
    ),
    homeTeam: Yup.string().required(
      `${intl.formatMessage({ id: 'lbl.add-match-homeTeam' })} ${intl.formatMessage({
        id: 'lbl.is-height-required',
      })}`,
    ),
    awayTeam: Yup.string().required(
      `${intl.formatMessage({ id: 'lbl.add-match-awayTeam' })} ${intl.formatMessage({
        id: 'lbl.is-height-required',
      })}`,
    ),
    homeTeamScore: Yup.number()
      .typeError(
        `${intl.formatMessage({ id: 'lbl.add-match-homeTeamScore' })} ${intl.formatMessage({
          id: 'lbl.number',
        })}`,
      )
      .min(
        0,
        `${intl.formatMessage({ id: 'lbl.add-match-awayTeamScore' })} ${intl.formatMessage({
          id: 'lbl.pozitive-number',
        })}`,
      ),
    awayTeamScore: Yup.number()
      .typeError(
        `${intl.formatMessage({ id: 'lbl.add-match-awayTeamScore' })} ${intl.formatMessage({
          id: 'lbl.number',
        })}`,
      )
      .min(
        0,
        `${intl.formatMessage({ id: 'lbl.add-match-awayTeamScore' })} ${intl.formatMessage({
          id: 'lbl.pozitive-number',
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

  const addMatches = () => {
    if ((!isFirstImageSelected || !isSecoundImageSelected) && !disableValidations) {
      setIsFirstImageSelected(false);
      setIsSecoundImageSelected(false);
      return;
    }

    addNewMatch(values);
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
      <TextField
        placeholder={intl.formatMessage({ id: 'lbl.add-match-event' })}
        name='event'
        label={intl.formatMessage({ id: 'lbl.add-match-event' })}
        required
        {...register('event')}
        error={errors.event ? true : false}
        helperText={errors.event?.message}
        value={values.event}
        onChange={(event) => handleChange({ ...values, event: event.target.value })}
      />

      <DatePicker
        label={intl.formatMessage({ id: 'lbl.add-match-date' })}
        name='date'
        values={values}
        minDate={values['date']}
        handleChange={handleChange}
      />

      <TextField
        placeholder={intl.formatMessage({ id: 'lbl.add-match-location' })}
        name='location'
        label={intl.formatMessage({ id: 'lbl.add-match-location' })}
        required
        {...register('location')}
        error={errors.location ? true : false}
        helperText={errors.location?.message}
        value={values.location}
        onChange={(event) => handleChange({ ...values, location: event.target.value })}
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
        {staffAgeCategory?.map((ageCategory) => (
          <MenuItem key={ageCategory.id} value={ageCategory}>
            {ageCategory.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        {...register('matchType')}
        name='matchType'
        label={intl.formatMessage({ id: 'lbl.add-match-matchTypeId' })}
        select
        error={errors.matchType ? true : false}
        helperText={errors.matchType?.message}
        value={values['matchType']}
        onChange={(event) => handleChange({ ...values, matchType: event.target.value })}
      >
        {matchTypes?.map((matchType) => (
          <MenuItem key={matchType.id} value={matchType}>
            {matchType.name}
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', mr: '5rem' }}
        >
          <UploadImage
            key='homeTeamLogo'
            name='homeTeamLogo'
            label='lbl.image'
            values={values}
            disableValidations={disableValidations}
            setValues={setValues}
            isSelected={isFirstImageSelected}
            setIsSelected={setIsFirstImageSelected}
            errors={errors}
          />

          <TextField
            placeholder={intl.formatMessage({ id: 'lbl.add-match-homeTeam' })}
            name='homeTeam'
            label={intl.formatMessage({ id: 'lbl.add-match-homeTeam' })}
            required
            {...register('homeTeam')}
            error={errors.homeTeam ? true : false}
            helperText={errors.homeTeam?.message}
            value={values.homeTeam}
            onChange={(event) => handleChange({ ...values, homeTeam: event.target.value })}
          />

          <TextField
            placeholder={intl.formatMessage({ id: 'lbl.add-match-homeTeamScore' })}
            name='homeTeamScore'
            label={intl.formatMessage({ id: 'lbl.add-match-homeTeamScore' })}
            required
            {...register('homeTeamScore')}
            error={errors.homeTeamScore ? true : false}
            helperText={errors.homeTeamScore?.message}
            value={values.homeTeamScore}
            onChange={(event) => handleChange({ ...values, homeTeamScore: event.target.value })}
          />
        </Box>

        <Box
          sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', ml: '5rem' }}
        >
          <UploadImage
            key='awayTeamLogo'
            name='awayTeamLogo'
            label='lbl.image'
            values={values}
            disableValidations={disableValidations}
            setValues={setValues}
            isSelected={isSecoundImageSelected}
            setIsSelected={setIsSecoundImageSelected}
            errors={errors}
          />

          <TextField
            placeholder={intl.formatMessage({ id: 'lbl.add-match-awayTeam' })}
            name='awayTeam'
            label={intl.formatMessage({ id: 'lbl.add-match-awayTeam' })}
            required
            {...register('awayTeam')}
            error={errors.awayTeam ? true : false}
            helperText={errors.awayTeam?.message}
            value={values.awayTeam}
            onChange={(event) => handleChange({ ...values, awayTeam: event.target.value })}
          />

          <TextField
            placeholder={intl.formatMessage({ id: 'lbl.add-match-awayTeamScore' })}
            name='awayTeamScore'
            label={intl.formatMessage({ id: 'lbl.add-match-awayTeamScore' })}
            required
            {...register('awayTeamScore')}
            error={errors.awayTeamScore ? true : false}
            helperText={errors.awayTeamScore?.message}
            value={values.awayTeamScore}
            onChange={(event) => handleChange({ ...values, awayTeamScore: event.target.value })}
          />
        </Box>
      </Box>
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title={intl.formatMessage({ id: content ? 'lbl.edit-match' : 'lbl.add-match' })}
      content={getContent()}
      onSubmit={handleSubmit(addMatches)}
      save={content ? 'btn.save' : 'btn.add'}
      width='50rem'
      typographyProps={{ textAlign: 'center' }}
    />
  );
};

export default MatchModal;
