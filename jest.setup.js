/* eslint-disable no-undef */
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('rn-fetch-blob', () => {
  return {
    DocumentDir: () => {},
    polyfill: () => {},
  };
});

jest.mock('react-native-i18n', () => ({
  t: jest.fn((translation) => translation),
}));

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);
// jest.mock('react-native-qrcode-scanner', () => jest.fn());

jest.mock('react-native-qrcode-scanner', () => {
  const React = require('react');
  const PropTypes = require('prop-types');
  return class MockQRCodeScanner extends React.Component {
    static propTypes = {children: PropTypes.any};

    render() {
      return React.createElement(
        'react-native-qrcode-scanner',
        this.props,
        this.props.children,
      );
    }
  };
});

// jest.mock('vasern', () => {
//   let Vasern = require('./src/database');
//   let StampCardsSchema = require('./src/database/Schemas/StampCardsSchema');
//   let StampsSchema = require('./src/database/Schemas/StampsSchema');
//   let UserSchema = require('./src/database/Schemas/UserSchema');
//   return new Vasern({
//     schemas: [StampCardsSchema, StampsSchema, UserSchema],
//     version: 1,
//   });
// });

// jest.mock('vasern', () => {
//   return {
//     VasernManager: {
//       Request: jest.fn(),
//       Insert: jest.fn(),
//     },
//   };
// });
