import React from 'react';

import ContentLoader from 'react-content-loader';

const NewsSkeleton = () => {
  return (
    <ContentLoader
      width='35rem'
      height='23rem'
      speed={1}
      backgroundColor='#333'
      foregroundColor='#999'
    >
      <rect width='100%' height='100%' />
    </ContentLoader>
  );
};

export default NewsSkeleton;
