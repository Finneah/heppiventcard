const {defaults: tsjPreset} = require('ts-jest/presets');

module.exports = {
  preset: 'react-native',
  testRegex: '(/__tests__/.*|/src/.*\\.(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'ios.ts',
    'ios.tsx',
    'android.ts',
    'android.tsx',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/src/features/*',
    '<rootDir>/src/app/store.ts',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!react-native-i18n)(?!native-base/)(?!react-navigation|@react-navigation/.*)(?!vasern)(?!rn-tourguide)(@react-native-community|react-navigation|@react-navigation/.*)',
  ],

  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },

  cacheDirectory: '.jest/cache',
  testEnvironment: 'jsdom',
  setupFiles: [
    '<rootDir>/jest.setup.js',
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
  ],
};
