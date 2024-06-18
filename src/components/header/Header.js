import React, { useState, useContext, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  ListItemIcon,
  Container,
  Menu,
  IconButton,
  MenuItem,
  Typography,
  Button,
  AppBar,
  Box,
  Toolbar,
} from '@mui/material';

import { ColorModeContext, ZTSIntlContext } from '../../contexts';
import { SUPPORTED_LOCALES } from '../../config/intl/Constants';
import ZTSIcon from '../icons';
import { Logo } from '../../resources';
import { LoginModal, BasicModal, ErrorDescription } from '../modals/';

import { doLogout, setAuthError, setAuthStatus } from '../../config/redux/slices/AuthSlice';

function Header() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const intl = useIntl();
  let navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
  const { locale, nextLanguage, switchLanguage } = useContext(ZTSIntlContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [error, setError] = useState(null);

  const { loggedIn, authError, auth_status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth_status === 'failed' && authError) {
      setError(true);
    }

    if (auth_status === 'success') {
      dispatch(setAuthStatus(null));
    }
  }, [auth_status, dispatch]); // Only re-run the effect if staff members changes

  const pages = [
    { label: intl.formatMessage({ id: 'lbl.club' }), url: '/club' },
    { label: intl.formatMessage({ id: 'lbl.calendar' }), url: '/calendar' },
    { label: intl.formatMessage({ id: 'lbl.news' }), url: '/noutati' },
    { label: intl.formatMessage({ id: 'lbl.teams' }), url: '/echipe' },
  ];
  const userTabs = [
    {
      label: intl.formatMessage(
        theme.palette.mode === 'light'
          ? { id: 'lbl.change-theme-to-dark' }
          : { id: 'lbl.change-theme-to-white' },
      ),
      iconName: theme.palette.mode === 'light' ? 'moon' : 'sun',
      onClick: function () {
        handleCloseUserMenu();
        colorMode.toggleColorMode();
      },
    },
    {
      label: SUPPORTED_LOCALES[nextLanguage(locale)],
      iconName: 'earth',
      onClick: function () {
        handleCloseUserMenu();
        switchLanguage(nextLanguage(locale));
      },
    },
    {
      label: intl.formatMessage({ id: loggedIn ? 'lbl.logout' : 'lbl.login' }),
      iconName: 'user',
      onClick: function () {
        handleCloseUserMenu();
        loggedIn ? dispatch(doLogout()) : setShowLoginModal(true);
      },
    },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);

    if (page.url) navigate(page.url);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleError = () => {
    setError(false);
    dispatch(setAuthError(null));
    dispatch(setAuthStatus(null));
  };

  return (
    <AppBar position='static' width='100%' sx={{ backgroundImage: 'initial' }}>
      <Container maxWidth={false} sx={{ ml: '0px', mr: '0px' }}>
        <Toolbar disableGutters>
          <Logo sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} height='70px' />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu(null)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign='center'>{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Logo sx={{ display: { xs: 'flex', md: 'none', flexGrow: 1 }, mr: 2 }} height='70px' />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                variant={
                  window.location.pathname == page.url ? 'selectedNavbarButtons' : 'navbarButtons'
                }
                key={page.label}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userTabs.map((tab) => (
                <MenuItem key={tab.label} onClick={tab.onClick}>
                  <ListItemIcon>
                    <ZTSIcon name={tab.iconName} />
                  </ListItemIcon>
                  <Typography textAlign='center'>{tab.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        {showLoginModal && (
          <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
        )}

        {error && (
          <BasicModal
            isError
            open={error}
            onClose={handleError}
            title={authError && <ErrorDescription error={authError} />}
            onSubmit={handleError}
            save='btn.ok'
            close='btn.cancel'
          />
        )}
      </Container>
    </AppBar>
  );
}
export default Header;
