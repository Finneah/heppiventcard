/* eslint-disable no-undef */
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('rn-fetch-blob', () => {
  return {
    DocumentDir: () => {},
    polyfill: () => {},
  };
});
jest.mock('react-navigation', () => {
  return {
    createAppContainer: jest
      .fn()
      .mockReturnValue(function NavigationContainer(props) {
        return null;
      }),
    createDrawerNavigator: jest.fn(),
    createMaterialTopTabNavigator: jest.fn(),
    createStackNavigator: jest.fn(),
    StackActions: {
      push: jest
        .fn()
        .mockImplementation((x) => ({...x, type: 'Navigation/PUSH'})),
      replace: jest
        .fn()
        .mockImplementation((x) => ({...x, type: 'Navigation/REPLACE'})),
    },
    NavigationActions: {
      navigate: jest.fn().mockImplementation((x) => x),
    },
  };
});

jest.mock('react-native-i18n', () => ({
  t: jest.fn((translation) => translation),
}));

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
