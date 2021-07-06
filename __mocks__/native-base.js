jest.mock('native-base', () => {
  return {
    StyleProvider: jest.fn().mockImplementation((x) => x),
  };
});
