import I18n from 'react-native-i18n';

import {en} from './en';
import {de} from './de';

I18n.fallbacks = true;

I18n.translations = {de, en};

// export function _setTranslations(language) {
//     language == 'de' ? (I18n.translations = {de}) : (I18n.translations = {en});
// }
// export const currentLocale = I18n.currentLocale();
// Is it a RTL language?
// export const isRTL =
//     currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;

// // Allow RTL alignment in RTL languages
// ReactNative.I18nManager.allowRTL(isRTL);

export function strings(name: string, params = {}): string {
  try {
    if (name) {
      var key = I18n.t(name, params);

      // If key is missing its easy to see in console
      // if (key && key.indexOf('[missing') !== -1) {
      //   console.info('MISSING', key);
      // }
      return key;
    }
    return '';
  } catch (error) {
    console.info(error);
    return '';
  }
}

export default I18n;
