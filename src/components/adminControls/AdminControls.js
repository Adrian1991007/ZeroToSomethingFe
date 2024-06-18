import React from 'react';
import { useSelector } from 'react-redux';

import { Box } from '@mui/material';
import { IconButton } from '../iconButton';

const AdminControls = ({ controlsList, isNews = false, ...props }) => {
  const { loggedIn, role } = useSelector((state) => state.auth);
  const controls = controlsList.map((control, index) => {
    return (
      <IconButton
        iconColor={control.iconColor}
        onClick={control.onClick}
        key={index}
        name={control.name}
      />
    );
  });

  return (
    <Box
      sx={{
        textAlign: 'right',
        mt: '0.5rem',
        mr: '0.5rem',
        visibility: loggedIn && (isNews || role === 'admin') ? 'initial' : 'hidden',
        ...props,
      }}
    >
      {controls}
    </Box>
  );
};

export default AdminControls;
