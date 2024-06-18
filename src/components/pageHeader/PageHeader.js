import React from 'react';

import { Paper, Card, Typography, Box } from '@material-ui/core';

const PageHeader = (props) => {
  const { title, subTitle, icon, titleProps, ...sx } = props;
  return (
    <Paper elevation={0} square sx={{ backgroundColor: 'transparent' }}>
      <Box sx={sx}>
        <Card
          sx={{
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: 'none',
          }}
        >
          {icon}
        </Card>
        <Box pl={4}>
          <Typography
            {...titleProps}
            variant='h6'
            component='div'
            color='white'
            fontSize='30px'
            ml='-2rem'
          >
            {title}
          </Typography>
          <Typography variant='subtitle2' component='div' color='white'>
            {subTitle}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default PageHeader;
