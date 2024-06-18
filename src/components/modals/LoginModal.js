import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { TextField, Box } from '@mui/material';

import BasicModal from './BasicModal';
import { login } from '../../config/redux/slices/AuthSlice';

const defaultInputValues = {
  email: '',
  password: '',
};

const LoginModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [values, setValues] = useState(defaultInputValues);

  const modalStyles = {
    inputFields: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '20px',
      marginBottom: '15px',
      '.MuiFormControl-root': {
        marginBottom: '20px',
      },
    },
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required(
      `${intl.formatMessage({ id: 'lbl.password' })} ${intl.formatMessage({
        id: 'lbl.is-height-required',
      })}`,
    ),
    email: Yup.string()
      .required(
        `${intl.formatMessage({ id: 'lbl.email-address' })} ${intl.formatMessage({
          id: 'lbl.is-height-required',
        })}`,
      )
      .email(
        `${intl.formatMessage({ id: 'lbl.email-address' })} ${intl.formatMessage({
          id: 'lbl.is-height-required',
        })}`,
      ),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const addUser = (data) => {
    dispatch(login(data));
    onClose();
  };

  const handleChange = (value) => {
    setValues(value);
  };

  useEffect(() => {
    if (open) setValues(defaultInputValues);
  }, [open]);

  const getContent = () => (
    <Box as='form' sx={modalStyles.inputFields}>
      <TextField
        placeholder='Email'
        name='email'
        label='Email'
        autoComplete='email'
        required
        {...register('email')}
        error={errors.email ? true : false}
        helperText={errors.email?.message}
        value={values.email}
        onChange={(event) => {
          handleChange({ ...values, email: event.target.value });
          setValue('email', event.target.value);
        }}
      />
      <TextField
        {...register('password')}
        placeholder='Password'
        name='password'
        type='password'
        label='Password'
        autoComplete='current-password'
        required
        error={errors.password ? true : false}
        helperText={errors.password?.message}
        value={values.password}
        onChange={(event) => {
          handleChange({ ...values, password: event.target.value });
          setValue('password', event.target.value);
        }}
      />
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title={intl.formatMessage({ id: 'lbl.login' })}
      subTitle={intl.formatMessage({ id: 'lbl.header-login' })}
      content={getContent()}
      onSubmit={handleSubmit(addUser)}
      save='btn.sign-in'
      close='btn.back'
    />
  );
};

export default LoginModal;
