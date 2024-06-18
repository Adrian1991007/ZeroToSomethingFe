import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Box, TextField } from '@mui/material';
import { MenuItem } from '@material-ui/core';

import BasicModal from './BasicModal';
import { DatePicker } from '../datePicker';

const ClubTrophyModal = ({ open, onClose, content = null, addNewTrophy }) => {
  const intl = useIntl();

  const { staffAgeCategory } = useSelector((state) => state.staff);
  const defaultInputValues = {
    name: content ? content.name : '',
    acquiredDate: content ? content.acquiredDate : new Date(),
    championship: content ? content.championship : '',
    ageCategory: content
      ? staffAgeCategory.filter((ageCategory) => ageCategory.name == content.ageCategory.name)[0]
      : staffAgeCategory[0],
  };

  const [values, setValues] = useState(defaultInputValues);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(
      `${intl.formatMessage({ id: 'lbl.name' })} ${intl.formatMessage({
        id: 'lbl.is-required',
      })}`,
    ),
    championship: Yup.string().required(
      `Campionatul ${intl.formatMessage({ id: 'lbl.is-required' })}`,
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const addNewClubTrophy = () => {
    addNewTrophy(values);
  };

  const handleChange = (value) => {
    setValues(value);
  };

  const getContent = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        marginBottom: '15px',
        '.MuiFormControl-root': {
          marginBottom: '20px',
        },
      }}
    >
      <TextField
        placeholder={intl.formatMessage({ id: 'lbl.Name' })}
        name='name'
        label={intl.formatMessage({ id: 'lbl.Name' })}
        required
        {...register('name')}
        error={errors.name ? true : false}
        helperText={errors.name?.message}
        value={values.name}
        onChange={(event) => handleChange({ ...values, name: event.target.value })}
      />
      <DatePicker
        label={intl.formatMessage({ id: 'lbl.club-trophy-date-table' })}
        name='Data acordarii'
        values={values}
        handleChange={handleChange}
      />
      <TextField
        placeholder={intl.formatMessage({ id: 'lbl.club-trophy-championship' })}
        name='championship'
        label={intl.formatMessage({ id: 'lbl.club-trophy-championship' })}
        required
        {...register('championship')}
        error={errors.championship ? true : false}
        helperText={errors.championship?.message}
        value={values.championship}
        onChange={(event) => handleChange({ ...values, championship: event.target.value })}
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
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title={intl.formatMessage({ id: 'lbl.trophy-modal-title' })}
      subTitle={intl.formatMessage({ id: 'lbl.sponsors-modal-subTitle' })}
      content={getContent()}
      onSubmit={handleSubmit(addNewClubTrophy)}
      save={content ? 'btn.save' : 'btn.add'}
    />
  );
};

export default ClubTrophyModal;
