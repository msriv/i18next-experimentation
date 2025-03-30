import 'react-i18next';
import resources from './strings.json';

declare module 'react-i18next' {
  interface Resources {
    strings: typeof resources.en.translation;
  }
}