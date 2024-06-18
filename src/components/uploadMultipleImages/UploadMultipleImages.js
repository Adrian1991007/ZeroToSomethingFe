/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';

import { Fab, ImageList, ImageListItem, Box, Input, Menu, MenuItem } from '@mui/material';
import { Add } from '@mui/icons-material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const UploadMultipleImages = ({ values, name, setValues, disabled }) => {
  const intl = useIntl();
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState(values['contentTypeId'] === 1 ? values[name] : null);
  const [videos, setVideos] = useState(values['contentTypeId'] === 2 ? values[name] : null);
  const arr = [];
  const [filesType, setFilesType] = useState(1);

  const fileRef = useRef();
  const handleClick = (popupState) => {
    fileRef.current.click();
    setFilesType(1);
    popupState.close();
  };

  const handleAddVideos = (popupState) => {
    fileRef.current.click();
    setFilesType(2);
    popupState.close();
  };

  const handleChange = (e) => {
    setFiles([...e.target.files]);
    fileRef.current.value = null;
  };

  useEffect(() => {
    if (files.length > 0) {
      if (filesType === 1) {
        files.slice(0, 10).map((file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const base64ImageLocalVar = reader.result.split(',')[1];
            arr.push(base64ImageLocalVar);
            setImages(arr);
            setValues({ ...values, content: arr });
          };
        });
      } else {
        files.slice(0, 10).map((file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const base64ImageLocalVar = reader.result;
            arr.push(base64ImageLocalVar);
            setVideos(arr);
          };
        });
      }
    }
  }, [files]);

  return (
    <Box textAlign='center' mb='1rem'>
      <PopupState variant='popover' popupId='demo-popup-menu'>
        {(popupState) => (
          <React.Fragment>
            <Input
              type='file'
              inputProps={{
                multiple: true,
                accept: filesType === 1 ? 'image/*' : 'video/*',
              }}
              sx={{ display: 'none' }}
              inputRef={fileRef}
              onChange={handleChange}
            />
            <Fab disabled={disabled} color='primary' aria-label='add' {...bindTrigger(popupState)}>
              <Add fontSize='large' />
            </Fab>
            <Menu
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              {...bindMenu(popupState)}
            >
              <MenuItem onClick={() => handleClick(popupState)}>
                {intl.formatMessage({ id: 'lbl.upload-images' })}
              </MenuItem>
              <MenuItem onClick={() => handleAddVideos(popupState)}>
                {intl.formatMessage({ id: 'lbl.upload-videos' })}
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>

      {images.length > 0 && (
        <ImageList sx={{ width: '100%', height: 150 }} cols={5} rowHeight={150}>
          {images.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={item?.includes('zts.blob') ? item : 'data:image/png;base64,' + item}
                srcSet={item?.includes('zts.blob') ? item : 'data:image/png;base64,' + item}
                alt='test'
                style={{ float: 'left', width: '120px', height: '100px', objectfit: 'cover' }}
                loading='lazy'
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
};

export default UploadMultipleImages;
