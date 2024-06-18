import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Box } from '@mui/material';

import { useTable } from '../useTable';
import Controls from '../base';
import ZTSIcon from '../icons';
import { ClubTrophyModal, BasicModal } from '../modals';

import {
  getClubTrophies,
  newClubTrophy,
  deleteClubTrophy,
} from '../../config/redux/slices/ClubTrophySlice';

const TrophyTable = ({ selectedFilters = [] }) => {
  const dispatch = useDispatch();
  const { loggedIn, role } = useSelector((state) => state.auth);
  const { clubTrophy, clubTrophyError } = useSelector((state) => state.clubTrophy);
  const intl = useIntl();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState(clubTrophy);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    if (!clubTrophy && !clubTrophyError) {
      dispatch(getClubTrophies());
    }
  }, [clubTrophy, clubTrophyError, dispatch]); // Only re-run the effect if sponsors changes

  const headCells = [
    {
      id: 'name',
      label: intl.formatMessage({ id: 'lbl.club-trophy-trophy-table' }),
    },
    {
      id: 'date',
      label: intl.formatMessage({ id: 'lbl.club-trophy-date-table' }),
    },
    {
      id: 'Campionat',
      label: intl.formatMessage({ id: 'lbl.club-trophy-championship' }),
    },
    {
      id: 'Categorie',
      label: intl.formatMessage({ id: 'lbl.club-trophy-age-category-table' }),
    },
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
        ? clubTrophy
        : clubTrophy.filter((x) =>
            x.edition.toLowerCase().includes(selectedFilters.Editie.toLowerCase()),
          ),
    );
  }, [selectedFilters, clubTrophy]); // Only re-run the effect if selectedFilters changes

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
  };

  const handleRemove = (record) => {
    setShowConfirmation(true);
    setCurrentItem(record);
  };

  const addNewClubTrophy = (trophy) => {
    const clubTrophyRequest = {
      name: trophy.name,
      acquiredDate: trophy.acquiredDate,
      championship: trophy.championship,
      ageCategoryId: trophy.ageCategory.id,
    };
    dispatch(newClubTrophy(clubTrophyRequest));
    setShowModal(false);
  };

  const confirmDeleteClubTrophy = () => {
    dispatch(deleteClubTrophy(currentItem.id));
    setShowConfirmation(false);
  };
  return (
    <Paper sx={{ width: '100%', mx: '2rem', px: '1rem' }}>
      <Toolbar sx={{ justifyContent: 'space-between', pt: '1rem' }}>
        <Controls.Input
          label={intl.formatMessage({ id: 'lbl.club-trophy-search' })}
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
          onClick={() => setShowModal(true)}
          text={intl.formatMessage({ id: 'btn.new-club-trophy' })}
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
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.acquiredDate}</TableCell>
              <TableCell>{item.championship}</TableCell>
              <TableCell>{item.ageCategory.name}</TableCell>
              {loggedIn && role === 'admin' && (
                <TableCell>
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
        <ClubTrophyModal open={showModal} onClose={handleOnClose} addNewTrophy={addNewClubTrophy} />
      )}

      {showConfirmation && (
        <BasicModal
          isError
          open={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          title={intl.formatMessage({ id: 'lbl.delete-confirmation' })}
          onSubmit={confirmDeleteClubTrophy}
          save='btn.ok'
        />
      )}
    </Paper>
  );
};

export default TrophyTable;
