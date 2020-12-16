// @flow

import variable from './../variables/platform';

export default (variables /* : * */ = variable) => {
  const iconTheme = {
    fontSize: variables.iconFontSize,
    color: variables.textColor,
    '.large': {
      fontSize: variables.iconFontSize * 1.5,
    },
  };

  return iconTheme;
};
