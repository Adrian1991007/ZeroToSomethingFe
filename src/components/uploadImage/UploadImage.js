import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

import { FormHelperText, Box, Button } from '@mui/material';

const UploadImage = ({
  values,
  name,
  setValues,
  isSelected,
  setIsSelected,
  errors,
  label = null,
  disableValidations = false,
}) => {
  const intl = useIntl();
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState(values[name]);

  useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onload = () => {
        const base64ImageLocalVar = reader.result.split(',')[1];
        setBase64Image(base64ImageLocalVar);
        setValues({ ...values, [name]: base64ImageLocalVar });
        setIsSelected(true);
      };
    }
  }, [selectedImage]);

  return (
    <Box textAlign='center' mb='1rem'>
      <input
        accept='image/*'
        type='file'
        id={`select-image${name}`}
        style={{ display: 'none' }}
        onChange={(e) => setSelectedImage(e.target.files[0])}
      />
      <label htmlFor={`select-image${name}`}>
        <Button variant='contained' color='primary' component='span'>
          {intl.formatMessage({ id: 'lbl.upload-image' })}
        </Button>
      </label>
      {!disableValidations &&
        (isSelected === false || (Object.keys(errors).length > 0 && !isSelected)) && (
          <FormHelperText sx={{ textAlign: 'center', color: 'red' }} id={`my-helper-text${name}`}>
            {label
              ? `${intl.formatMessage({ id: label })} ${intl.formatMessage({
                  id: 'lbl.is-height-required',
                })}`
              : `Logo ${intl.formatMessage({ id: 'lbl.is-required' })}`}
          </FormHelperText>
        )}

      {base64Image && (
        <Box mt={1} textAlign='center'>
          <div>{intl.formatMessage({ id: 'lbl.image-preview' })}</div>
          <img
            id={`my-helper-text${name}`}
            src={
              base64Image.includes('zts.blob')
                ? base64Image
                : 'data:image/png;base64,' + base64Image
            }
            alt={'sponsor image'}
            height='100px'
          />
        </Box>
      )}
    </Box>
  );
};

export default UploadImage;
