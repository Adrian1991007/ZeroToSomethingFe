import React, { useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Box, TextField } from '@mui/material';
import { MenuItem } from '@material-ui/core';

import BasicModal from './BasicModal';
import { generateEditions } from '../../common/Utilities';
import { numarOfEditionsGenerated } from '../../common/Constants';
import { UploadImage } from '../uploadImage';

const SponsorModal = ({ open, onClose, content = null, addNewSponsor }) => {
  const editions = useMemo(
    () => generateEditions(numarOfEditionsGenerated),
    [numarOfEditionsGenerated],
  );

  const defaultInputValues = {
    logo: null,
    name: '',
    edition: editions[numarOfEditionsGenerated - 1].id,
    url: '',
  };
  const intl = useIntl();
  const [values, setValues] = useState(content ? content : defaultInputValues);
  const [isLogoSelected, setIsLogoSelected] = useState(content ? true : null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(
      `${intl.formatMessage({ id: 'lbl.name' })} ${intl.formatMessage({
        id: 'lbl.is-required',
      })}`,
    ),
    url: Yup.string().required(`Url ${intl.formatMessage({ id: 'lbl.is-required' })}`),
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

  const addSponsor = () => {
    if (!isLogoSelected) {
      setIsLogoSelected(false);
      return;
    }
    setIsLogoSelected(null);
    addNewSponsor(values);
  };

  const handleChange = (value) => {
    setValues(value);
  };

  const getContent = () => (
    <Box sx={modalStyles.inputFields}>
      <UploadImage
        name='logo'
        values={values}
        setValues={setValues}
        isSelected={isLogoSelected}
        setIsSelected={setIsLogoSelected}
        errors={errors}
      />
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
      <TextField
        placeholder={intl.formatMessage({ id: 'lbl.edition' })}
        name='edition'
        label={intl.formatMessage({ id: 'lbl.edition' })}
        required
        select
        {...register('edition')}
        error={errors.edition ? true : false}
        helperText={errors.edition?.message}
        value={values['edition']}
        onChange={(event) => handleChange({ ...values, edition: event.target.value })}
      >
        {editions.map((edition) => (
          <MenuItem key={edition.id} value={edition.id}>
            {edition.id}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        placeholder='Url'
        name='url'
        label='Url'
        required
        {...register('url')}
        error={errors.url ? true : false}
        helperText={errors.url?.message}
        value={values.url}
        onChange={(event) => handleChange({ ...values, url: event.target.value })}
      />
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title={intl.formatMessage({
        id: content ? 'lbl.edit-modal-title' : 'lbl.sponsors-modal-title',
      })}
      subTitle={intl.formatMessage({ id: 'lbl.sponsors-modal-subTitle' })}
      content={getContent()}
      onSubmit={handleSubmit(addSponsor)}
      save={content ? 'btn.save' : 'btn.add'}
    />
  );
};

export default SponsorModal;
