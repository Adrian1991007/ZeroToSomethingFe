import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { getStaffMemberFullName } from '../../common/Utilities';
import { profileImage } from '../../resources';

const StaffCard = ({ staffMember, onSelected }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const staffMemberFullName = getStaffMemberFullName(staffMember);

  const handleClick = () => {
    var staffMemberUrlName = staffMemberFullName.replace(/\s+/g, '');

    onSelected(staffMember);
    navigate(`/staff/${staffMemberUrlName}`);
  };

  return (
    <Box
      border='none'
      borderRadius='0.5rem'
      backgroundColor={theme.palette._white}
      width='18rem'
      height='20rem'
      as='button'
      p={1}
      onClick={handleClick}
    >
      <img
        height='200px'
        width='200px'
        src={staffMember.profileImage.length > 0 ? staffMember.profileImage : profileImage}
        style={{
          marginTop: '-2rem',
          borderRadius: '50%',
          border: '5px solid #0F2043',
        }}
        alt='Jucator logo'
      />
      <Typography sx={{ mt: '2rem', fontSize: 18 }}>{staffMemberFullName}</Typography>
    </Box>
  );
};

export default StaffCard;
