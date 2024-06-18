/* eslint-disable no-unused-vars */
import React from 'react';

import { useIntl } from 'react-intl';
import { Box, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Controls } from '../../components';
import { useForm, Form } from '../useForm';

const Filter = ({ title, filters, setSelectedFilters, ...props }) => {
  const intl = useIntl();
  const initialFValues = {};
  const theme = useTheme();

  filters.forEach((filtru) => {
    initialFValues[filtru.label] = '';
  });

  const { values, handleInputChange, resetForm } = useForm(initialFValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedFilters(values);
  };

  const handleReset = () => {
    resetForm();
    setSelectedFilters(initialFValues);
  };

  return (
    <Box sx={{ height: '100%', ...props }}>
      <Form onSubmit={handleSubmit}>
        <Box
          sx={{
            backgroundColor: theme.palette._white,
            display: 'flex',
            flexDirection: ['column', 'column', 'row', 'row'],
            alignItems: 'center',
            width: '100%',
            borderRadius: '25px',
            border: '4px solid #c98724',
          }}
        >
          <Typography noWrap minWidth='100px' variant='sponsor' mx='2rem' my='1rem'>
            {title}
          </Typography>
          <Grid
            container
            direction='column'
            width='60%'
            minWidth='150px'
            mr='2rem'
            my='0.5rem'
            gap={3}
          >
            {filters.map((filtru) => {
              return (
                <Controls.Select
                  key={filtru.label}
                  name={filtru.label}
                  label={filtru.label}
                  value={values[filtru.label]}
                  options={filtru.editions}
                  onChange={handleInputChange}
                />
              );
            })}
          </Grid>
          <Grid
            container
            sx={{
              my: '0.5rem',
              justifyContent: ['center', 'center', 'initial', 'initial'],
              flexDirection: 'row',
            }}
          >
            <Controls.Button
              sx={{ my: '0.5rem', mx: '1rem' }}
              variant='contained'
              type='submit'
              text={intl.formatMessage({ id: 'btn.submit' })}
            />
            <Controls.Button
              sx={{ my: '0.5rem', mx: '1rem' }}
              text={intl.formatMessage({ id: 'btn.reset' })}
              onClick={handleReset}
            />
          </Grid>
        </Box>
      </Form>
    </Box>
  );
};

export default Filter;
