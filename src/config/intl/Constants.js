import language_ro from './messages/ro.json';
import language_en from './messages/en.json';

const INITIAL_LOCALE = 'ro';

const MESSAGES = {
  ro: language_ro,
  en: language_en,
};

const SUPPORTED_LOCALES = {
  ro: 'Romana',
  en: 'English',
};

export { MESSAGES, SUPPORTED_LOCALES, INITIAL_LOCALE };
