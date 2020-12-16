// @flow

import variable from './../variables/platform';

export default (variables /* : * */ = variable) => {
  const textTheme = {
    fontSize: variables.DefaultFontSize,
    fontFamily: variables.fontFamily,
    color: variables.textColor,
    '.note': {
      color: '#a7a7a7',
      fontSize: variables.noteFontSize,
      '.large': {
        fontSize: variables.noteFontSize * 1.5,
      },
    },
    '.large': {
      fontSize: variables.DefaultFontSize * 1.5,
    },
  };

  return textTheme;
};
