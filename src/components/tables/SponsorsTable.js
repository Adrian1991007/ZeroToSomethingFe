import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Box, IconButton } from '@mui/material';

import { useTable } from '../useTable';
import Controls from '../base';
import { SponsorModal, BasicModal } from '../modals';
import ZTSIcon from '../icons';
import {
  getSponsors,
  newSponsor,
  deleteSponsor,
  updateSponsor,
} from '../../config/redux/slices/SponsorsSlice';

const SponsorsTable = ({ selectedFilters }) => {
  const dispatch = useDispatch();
  const { loggedIn, role } = useSelector((state) => state.auth);
  const { sponsors, sponsorError } = useSelector((state) => state.sponsors);
  const intl = useIntl();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState(sponsors);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    if (!sponsors && !sponsorError) {
      dispatch(getSponsors('dds'));
    }
  }, [sponsors, sponsorError, dispatch]); // Only re-run the effect if sponsors changes

  const headCells = [
    { id: 'logo', label: 'Logo', disableSorting: true },
    {
      id: 'name',
      label: intl.formatMessage({ id: 'lbl.Name' }),
    },
    {
      id: 'edition',
      label: intl.formatMessage({ id: 'lbl.edition' }),
    },
    { id: 'url', label: 'Url', disableSorting: true },
    {
      id: 'actions',
      shouldBeLogged: true,
      label: intl.formatMessage({ id: 'lbl.actions' }),
      disableSorting: true,
    },
  ];

  useEffect(() => {
    const isFiltered = Object.values(selectedFilters).some((x) => x !== '');
    setFilteredRecords(
      !isFiltered
        ? sponsors
        : sponsors.filter((x) =>
            x.edition.toLowerCase().includes(selectedFilters.Editie.toLowerCase()),
          ),
    );
  }, [selectedFilters, sponsors]); // Only re-run the effect if selectedFilters changes

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(
    filteredRecords,
    headCells,
    filterFn,
  );

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === '') return items;
        else {
          return items.filter((x) => x.name.toLowerCase().includes(target.value.toLowerCase()));
        }
      },
    });
  };

  const handleOnClose = () => {
    setShowModal(false);
    setCurrentItem(null);
  };

  const handleRemove = (record) => {
    setShowConfirmation(true);
    setCurrentItem(record);
  };

  const handleEdit = (record) => {
    setShowModal(true);
    setCurrentItem(record);
  };

  const addNewSponsor = (sponsor) => {
    dispatch(newSponsor({ sponsor }));
    setShowModal(false);
  };

  const editSponsor = (sponsor) => {
    dispatch(updateSponsor({ sponsor }));
    setShowModal(false);
    setCurrentItem(null);
  };

  const confirmDeleteSponsor = () => {
    dispatch(deleteSponsor(currentItem.id));
    setCurrentItem(null);
    setShowConfirmation(false);
  };
  return (
    <Paper sx={{ width: '100%', mx: '2rem', px: '1rem' }}>
      <Toolbar sx={{ justifyContent: 'space-between', pt: '1rem' }}>
        <Controls.Input
          label={intl.formatMessage({ id: 'lbl.sponsors-search' })}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />

        <Controls.Button
          variant='navbarButtons'
          ya
          onClick={() => setShowModal(true)}
          text={intl.formatMessage({ id: 'btn.new-sponsors' })}
          sx={{ visibility: loggedIn && role === 'admin' ? 'initial' : 'hidden' }}
          endIcon={
            <Box mt='1rem'>
              <ZTSIcon name={'chevronRight'} color='black' />
            </Box>
          }
        />
      </Toolbar>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting()?.map((item) => (
            <TableRow sx={{ height: '120px' }} key={item.id}>
              <TableCell>
                <img height='70px' width='80px' alt='Sponsor logo' src={item.logo} />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.edition}</TableCell>
              <TableCell>{item.url}</TableCell>
              {loggedIn && role === 'admin' && (
                <TableCell>
                  <IconButton
                    variant='blackButtons'
                    size='small'
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    onClick={() => handleEdit(item)}
                  >
                    <ModeEditIcon />
                  </IconButton>
                  <IconButton
                    variant='blackButtons'
                    size='small'
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    onClick={() => handleRemove(item)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
      {showModal && (
        <SponsorModal
          open={showModal}
          onClose={handleOnClose}
          addNewSponsor={currentItem ? editSponsor : addNewSponsor}
          content={currentItem}
        />
      )}

      {showConfirmation && (
        <BasicModal
          isError
          open={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          title={intl.formatMessage({ id: 'lbl.delete-confirmation' })}
          onSubmit={confirmDeleteSponsor}
          save='btn.ok'
        />
      )}
    </Paper>
  );
};

export default SponsorsTable;
