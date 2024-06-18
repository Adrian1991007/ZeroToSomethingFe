import React, { useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Box, TextField } from '@mui/material';

import BasicModal from './BasicModal';
import { NewsStatus } from '../newsStatus';
import { UploadMultipleImages } from '../uploadMultipleImages';
import { HashTags } from '../hashTags';
const NewsModal = ({ open, onClose, content = null, addNewNews }) => {
  const intl = useIntl();

  const generateHashTags = (hashtags) => {
    if (!hashtags || hashtags.length === 0) return [];

    return hashtags?.map((hashtag) => {
      return { id: hashtag, text: hashtag };
    });
  };

  const hashtags = useMemo(() => generateHashTags(content?.hashtags), [content?.hashtags]);

  const defaultInputValues = {
    id: content ? content.id : '',
    title: content ? content.title : '',
    description: content ? content.description : '',
    text: content ? content.text : '',
    content: content ? content.content : [],
    hashtags: content ? hashtags : [],
    contentTypeId: content ? content.contentTypeId : 1,
    newsStatus: 2,
  };

  const [values, setValues] = useState(defaultInputValues);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(
      `${intl.formatMessage({ id: 'lbl.title-required' })} ${intl.formatMessage({
        id: 'lbl.is-required',
      })}`,
    ),
    description: Yup.string().required(
      `${intl.formatMessage({ id: 'lbl.staff-description-required' })} ${intl.formatMessage({
        id: 'lbl.is-height-required',
      })}`,
    ),
    text: Yup.string().required(
      `${intl.formatMessage({ id: 'lbl.text-required' })} ${intl.formatMessage({
        id: 'lbl.is-required',
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

  const addNews = () => {
    addNewNews(values);
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
        placeholder={intl.formatMessage({ id: 'lbl.title' })}
        name='title'
        label={intl.formatMessage({ id: 'lbl.title' })}
        required
        {...register('title')}
        error={errors.title ? true : false}
        helperText={errors.title?.message}
        value={values.title}
        onChange={(event) => handleChange({ ...values, title: event.target.value })}
      />

      <TextField
        placeholder={intl.formatMessage({ id: 'lbl.staff-description' })}
        name='description'
        label={intl.formatMessage({ id: 'lbl.staff-description' })}
        required
        {...register('description')}
        error={errors.description ? true : false}
        helperText={errors.description?.message}
        value={values.description}
        onChange={(event) => handleChange({ ...values, description: event.target.value })}
      />

      <TextField
        placeholder={intl.formatMessage({ id: 'lbl.text' })}
        name='text'
        label={intl.formatMessage({ id: 'lbl.text' })}
        required
        inputProps={{ maxLength: 1000 }}
        minRows={3}
        maxRows={3}
        multiline
        {...register('text')}
        error={errors.text ? true : false}
        helperText={errors.text?.message}
        value={values.text}
        onChange={(event) => handleChange({ ...values, text: event.target.value })}
      />

      <HashTags values={values} setValues={setValues} />

      <UploadMultipleImages
        name='content'
        values={values}
        setValues={setValues}
        disabled={values['contentTypeId'] === 2}
      />

      <NewsStatus values={values} setValues={setValues} />
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title={intl.formatMessage({ id: content ? 'lbl.edit-news' : 'lbl.add-news' })}
      content={getContent()}
      onSubmit={handleSubmit(addNews)}
      save={content ? 'btn.save' : 'btn.add'}
      width='50rem'
      typographyProps={{ textAlign: 'center' }}
    />
  );
};

export default NewsModal;
