import React from 'react';
import { FormattedMessage } from 'react-intl';

import ERROR_CODES from '../../common/ErrorCodes';

const ErrorDescription = ({ error }) => {
  switch (error.errorCode) {
    case ERROR_CODES.ALREADY_REGISTERED:
      return <FormattedMessage id='err.already_registered' />;

    case ERROR_CODES.ACCOUNT_NOT_FOUND:
      return <FormattedMessage id='err.account_not_found' />;

    default:
      return <FormattedMessage id='err.generic' />;
  }
};

export default ErrorDescription;
