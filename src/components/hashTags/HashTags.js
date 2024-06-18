import React from 'react';
import { POPULAR_TAGS } from './sugestions';
import './style.css';
import { WithContext as ReactTags } from 'react-tag-input';

const suggestions = POPULAR_TAGS.map((tag) => {
  return {
    id: tag,
    text: tag,
  };
});

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const HashTags = ({ isReadOnly = false, values, setValues = null }) => {
  const handleDelete = (i) => {
    setValues({ ...values, hashtags: values['hashtags'].filter((tag, index) => index !== i) });
  };

  const handleAddition = (tag) => {
    setValues({ ...values, hashtags: [...values['hashtags'], tag] });
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = values['hashtags'].slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    // setTags(newTags);
    setValues({ ...values, hashtags: newTags });
  };

  return (
    <ReactTags
      tags={values['hashtags']}
      suggestions={suggestions}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      placeholder='Hashtags'
      maxLength={15}
      autocomplete
      readOnly={isReadOnly}
    />
  );
};

export default HashTags;
