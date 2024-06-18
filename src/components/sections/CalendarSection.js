import React from 'react';
import { useIntl } from 'react-intl';

import { Typography } from '@mui/material';

import Section from '../section/Section';

const CalendarSection = () => {
  const intl = useIntl();
  return (
    <Section
      path='/calendar'
      headerLabel={intl.formatMessage({ id: 'lbl.calendar' })}
      buttonLabel={intl.formatMessage({ id: 'lbl.calendar-button-section' })}
    >
      <Typography>Text</Typography>
    </Section>
  );
};

export default CalendarSection;
