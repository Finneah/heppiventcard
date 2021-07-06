jest.mock('react-native-i18n', () => ({
  t: jest.fn((translation) => translation),
}));
