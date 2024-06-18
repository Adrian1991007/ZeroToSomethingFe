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
          pt='1rem'
          ml='2rem'
          sx={{
            backgroundColor: theme.palette._white,
            display: 'flex',
            flexDirection: 'column',
            minWidth: '250px',
            maxWidth: '250px',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '25px',
            border: '4px solid #c98724',
          }}
        >
          <Typography variant='sponsor'>{title}</Typography>
          <Grid mt='2rem' container direction='column' width='200px' gap={3}>
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
          <Grid mt='2rem' pb='2rem' container justifyContent={'center'}>
            <Controls.Button
              sx={{ mr: '1rem' }}
              variant='contained'
              type='submit'
              text={intl.formatMessage({ id: 'btn.submit' })}
            />
            <Controls.Button text={intl.formatMessage({ id: 'btn.reset' })} onClick={handleReset} />
          </Grid>
        </Box>
      </Form>
    </Box>
  );
};

export default Filter;
