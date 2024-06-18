import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';

import { MenuItem } from '@material-ui/core';
import { Box, TextField } from '@mui/material';
import BasicModal from './BasicModal';
import { DatePicker } from '../datePicker';

const TrophyModal = ({ open, onClose, addNewTrophy, positionsHistory, staffTrophies }) => {
  const intl = useIntl();

  const defaultInputValues = {
    positionsHistory: positionsHistory[0],
    trophy: staffTrophies[0],
    acquiredDate: new Date(),
  };

  const [values, setValues] = useState(defaultInputValues);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addTrophy = () => {
    addNewTrophy(values);
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
        name='positionsHistory'
        label={intl.formatMessage({ id: 'lbl.position' })}
        select
        {...register('positionsHistory')}
        error={errors.positionsHistory ? true : false}
        helperText={errors.positionsHistory?.message}
        value={values['positionsHistory']}
        onChange={(event) => handleChange({ ...values, positionsHistory: event.target.value })}
      >
        {positionsHistory.map((positionHistory) => (
          <MenuItem key={positionHistory.position.id} value={positionHistory}>
            {positionHistory.position.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        name='trophy'
        label={intl.formatMessage({ id: 'lbl.trophy' })}
        select
        {...register('trophy')}
        error={errors.trophy ? true : false}
        helperText={errors.trophy?.message}
        value={values['trophy']}
        onChange={(event) => handleChange({ ...values, trophy: event.target.value })}
      >
        {staffTrophies.map((trophy) => (
          <MenuItem key={trophy.id} value={trophy}>
            {trophy.name}
          </MenuItem>
        ))}
      </TextField>

      <DatePicker
        label={intl.formatMessage({ id: 'lbl.trophy-acquired-date' })}
        name='acquiredDate'
        values={values}
        minDate={values['positionsHistory'].startTime}
        maxDate={new Date()}
        handleChange={handleChange}
      />
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title={intl.formatMessage({ id: 'lbl.add-trophy' })}
      content={getContent()}
      onSubmit={handleSubmit(addTrophy)}
      save={'btn.add'}
      typographyProps={{ textAlign: 'center' }}
    />
  );
};

export default TrophyModal;
