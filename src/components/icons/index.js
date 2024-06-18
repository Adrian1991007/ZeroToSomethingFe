import React from 'react';

import { useTheme } from '@mui/material/styles';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import Volley from './Volley';
import Earth from './Earth';
import Moon from './Moon';
import Sun from './Sun';
import User from './User';
import ChevronRight from './ChevronRight';

const ZTSIcon = ({ name, ...props }) => {
  const theme = useTheme();
  const currentColor = theme.palette.mode === 'light' ? 'black' : 'white';
  switch (name) {
    case 'earth':
      return <Earth color={currentColor} size='24px' {...props} />;

    case 'user':
      return <User color={currentColor} size='24px' {...props} />;

    case 'chevronRight':
      return (
        <ChevronRight color={currentColor ? currentColor : currentColor} size='24px' {...props} />
      );

    case 'moon':
      return <Moon size='24px' {...props} />;

    case 'sun':
      return <Sun size='24px' {...props} />;

    case 'volley':
      return <Volley color='white' {...props} />;

    case 'volleyball':
      return <SportsVolleyballIcon sx={{ size: '10px', color: 'white' }} />;

    case 'add':
      return <AddIcon />;

    case 'edit':
      return <ModeEditIcon />;

    case 'delete':
      return <DeleteOutlineIcon />;

    default:
      return <Volley color='white' {...props} />;
  }
};

export default ZTSIcon;
