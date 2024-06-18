import React from 'react';
import { useIntl } from 'react-intl';

import { Typography } from '@mui/material';

import Section from '../section/Section';

const ClubSection = () => {
  const intl = useIntl();
  return (
    <Section
      path='/club'
      headerLabel={intl.formatMessage({ id: 'lbl.club' })}
      buttonLabel={intl.formatMessage({ id: 'lbl.club-button-section' })}
    >
      <Typography>Text</Typography>
    </Section>
  );
};

export default ClubSection;
