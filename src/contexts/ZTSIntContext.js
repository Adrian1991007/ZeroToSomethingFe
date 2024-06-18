import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import {
  SUPPORTED_LOCALES,
  INITIAL_LOCALE,
  MESSAGES,
} from '../config/intl/Constants';

const ZTSIntlContext = React.createContext();

function ZTSIntlProvider({ children }) {
  const nextLanguage = locale => {
    let localeList = Object.keys(SUPPORTED_LOCALES);
    let id = localeList.indexOf(locale);
    return localeList[(id + 1) % localeList.length];
  };
  const switchLanguage = locale => {
    if (Object.keys(SUPPORTED_LOCALES).includes(locale))
      setIntlParams({
        ...intlParams,
        locale,
      });
  };

  const [intlParams, setIntlParams] = useState({
    locale: INITIAL_LOCALE,
    // messages: IntlConstants.MESSAGES[IntlConstants.INITIAL_LOCALE],
    nextLanguage: nextLanguage,
    switchLanguage: switchLanguage,
  });

  return (
    <ZTSIntlContext.Provider value={intlParams}>
      <IntlProvider
        key={intlParams.locale}
        locale={intlParams.locale}
        messages={MESSAGES[intlParams.locale]}
        defaultLocale={INITIAL_LOCALE}
      >
        {children}
      </IntlProvider>
    </ZTSIntlContext.Provider>
  );
}

export { ZTSIntlContext, ZTSIntlProvider };
