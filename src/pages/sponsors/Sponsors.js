import React, { useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { Box } from '@mui/material';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';

import { Layout, Filter, PageHeader, SponsorsTable } from '../../components';
import { TeamBanner } from '../../resources/';

const Sponsors = () => {
  const intl = useIntl();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const { sponsors } = useSelector((state) => state.sponsors);

  const createSponsorsFilters = (sponsors) => {
    const filter = [
      {
        label: 'Editie',
        placeHolder: 'Selectati editia',
      },
    ];
    if (!sponsors) {
      return filter;
    }
    const editions = [];
    sponsors.map((sponsor) => {
      const newEdition = { id: sponsor.edition };
      if (!editions.some((e) => e.id === sponsor.edition)) {
        editions.push(newEdition);
      }
    });
    editions.sort((a, b) => {
      const firstEdition = parseInt(a.id.split('-')[0]);
      const secondEdition = parseInt(b.id.split('-')[0]);

      return firstEdition - secondEdition;
    });
    filter[0].editions = editions;
    return filter;
  };

  const sponsorsFilters = useMemo(() => createSponsorsFilters(sponsors), [sponsors]);
  return (
    <Layout>
      <Box mt='8rem' ml='10rem' position='absolute'>
        <PageHeader
          title={intl.formatMessage({ id: 'lbl.sponsors-page-header' })}
          subTitle={intl.formatMessage({
            id: 'lbl.sponsors-subTitle-page-header',
          })}
          icon={
            <PeopleOutlineTwoToneIcon fontSize='large' sx={{ color: 'white', border: 'none' }} />
          }
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', overflowX: 'hidden' }}>
        <img
          width='1982px'
          height='400px'
          src={TeamBanner}
          alt={intl.formatMessage({ id: 'lbl.alt-image-sponsors' })}
        />
      </Box>
      <Box
        sx={{
          py: '2rem',
          mx: '2rem',
          backgroundColor: 'header',
          mt: '1rem',
          display: 'flex',
          flexDirection: ['column', 'column', 'row'],
        }}
      >
        <Box
          sx={{
            mt: '0rem',
            mb: '3rem',
            width: '22rem',
          }}
        >
          <Filter
            title={intl.formatMessage({ id: 'lbl.filter-sponsors-by' })}
            filters={sponsorsFilters}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            mb='2rem'
          />
        </Box>
        <Box
          sx={{
            width: '70%',
          }}
        >
          <SponsorsTable selectedFilters={selectedFilters} />
        </Box>
      </Box>
    </Layout>
  );
};

export default Sponsors;
