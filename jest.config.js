const {defaults: tsjPreset} = require('ts-jest/presets');

module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  verbose: true,
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    '@react-navigation': '<rootDir>/__mocks__/@react-navigation.js',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  transform: {
    // '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js?$': require.resolve('babel-jest'),
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|rn-tourguide/.*)',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '\\.snap$'],
  cacheDirectory: '.jest/cache',
  testEnvironment: 'jsdom',
  setupFiles: [
    // '<rootDir>/__mocks__/rn-tourguide.js',
    '<rootDir>/__mocks__/react-native-gesture-handler.js',
    // './node_modules/react-native/jest/setup.js',
    // '<rootDir>/__mocks__/native-base.js',
    // '<rootDir>/__mocks__/react-native-permissions.js',
    '<rootDir>/__mocks__/react-native-i18n.js',
    // '<rootDir>/__mocks__/@react-navigation.js',
    // '<rootDir>/__mocks__/rn-fetch-blob.js',
    // '<rootDir>/__mocks__/vasern.js',
    '<rootDir>/__mocks__/@react-native-async-storage.js',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],

  collectCoverage: true,
  collectCoverageFrom: [
    'App.js',
    'src/**/*.js',
    '!<rootDir>/native-base-theme/',
  ],

  moduleDirectories: [
    'node_modules',
    'src',
    'components',
    // '!node-modules/native-base/*',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/jest'],
};
