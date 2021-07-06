jest.mock('@react-navigation/native', () => {
  return {
    createAppContainer: jest
      .fn()
      .mockReturnValue(function NavigationContainer(props) {
        return null;
      }),

    NavigationActions: {
      navigate: jest.fn().mockImplementation((x) => x),
    },
  };
});

jest.mock('@react-navigation/stack', () => {
  return {
    createAppContainer: jest
      .fn()
      .mockReturnValue(function NavigationContainer(props) {
        return null;
      }),

    createStackNavigator: jest.fn(),
    StackActions: {
      push: jest
        .fn()
        .mockImplementation((x) => ({...x, type: 'Navigation/PUSH'})),
      replace: jest
        .fn()
        .mockImplementation((x) => ({...x, type: 'Navigation/REPLACE'})),
      reset: jest.fn(),
    },
    NavigationActions: {
      navigate: jest.fn().mockImplementation((x) => x),
    },
    Navigator: jest.fn().mockImplementation((x) => x),
  };
});
