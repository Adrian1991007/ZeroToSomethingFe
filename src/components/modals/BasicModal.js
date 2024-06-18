import React from 'react';
import { useIntl } from 'react-intl';

import { Box, Typography, Modal } from '@mui/material';

import Controls from '../base';

const BasicModal = ({
  open,
  onClose,
  title,
  subTitle,
  content,
  onSubmit,
  save = 'btn.save',
  close = 'btn.cancel',
  isError,
  typographyProps,
  ...props
}) => {
  const intl = useIntl();
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          ...props,
        }}
      >
        <Typography
          sx={{ textAlign: isError ? 'center' : '', ...typographyProps }}
          variant='h6'
          component='h2'
        >
          {title}
        </Typography>
        <Typography sx={{ mt: isError ? 0 : 2, ...typographyProps }}>{subTitle}</Typography>
        {content}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: '1rem' }}>
          <Controls.Button
            text={intl.formatMessage({ id: save })}
            variant='contained'
            onClick={onSubmit}
          />
          <Controls.Button
            variant='contained'
            text={intl.formatMessage({ id: close })}
            onClick={onClose}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default BasicModal;
