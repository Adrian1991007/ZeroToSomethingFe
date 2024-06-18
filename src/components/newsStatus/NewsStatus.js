import React from 'react';
import { useIntl } from 'react-intl';

import { FormLabel, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const NewsStatus = ({ values, setValues }) => {
  const intl = useIntl();

  const handleChange = (event) => {
    setValues({ ...values, newsStatus: parseInt(event.target.value) });
  };

  return (
    <FormControl>
      <FormLabel id='newsStatus'>{intl.formatMessage({ id: 'lbl.news-status' })}</FormLabel>
      <RadioGroup
        row
        aria-labelledby='newsStatus'
        name='newsStatus'
        value={values['newsStatus']}
        onChange={handleChange}
      >
        <FormControlLabel
          value={2}
          control={<Radio />}
          label={intl.formatMessage({ id: 'lbl.news-status-post' })}
        />

        <FormControlLabel
          value={1}
          control={<Radio />}
          label={intl.formatMessage({ id: 'lbl.news-status-draft' })}
        />
        <FormControlLabel
          value={3}
          control={<Radio />}
          label={intl.formatMessage({ id: 'lbl.news-status-scheduled' })}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default NewsStatus;
