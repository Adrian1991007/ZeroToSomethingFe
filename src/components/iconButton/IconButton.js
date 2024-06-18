import React from 'react';

import { IconButton as MUIIconButton } from '@mui/material';

import ZTSIcon from '../icons';

const IconButton = ({ name, onClick, iconColor }) => {
  return (
    <MUIIconButton sx={{ color: iconColor }} onClick={onClick} size='small'>
      <ZTSIcon name={name} />
    </MUIIconButton>
  );
};

export default IconButton;
