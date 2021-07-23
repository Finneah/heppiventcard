import 'react-native';
import * as React from 'react';
import {render} from '@testing-library/react-native';

// Note: test renderer must be required after react-native.

import {NativeBaseProvider} from 'native-base';
import HomeScreen from './HomeScreen';

const wrapper = ({children}: any) => (
  <NativeBaseProvider
    initialWindowMetrics={{
      frame: {x: 0, y: 0, width: 0, height: 0},
      insets: {top: 0, left: 0, right: 0, bottom: 0},
    }}>
    {children}
  </NativeBaseProvider>
);

describe('HomeScreen', () => {
  test('renders correctly', () => {
    const homeScreen = render(<HomeScreen />, {wrapper});

    expect(homeScreen.toJSON()).toMatchSnapshot();
  });
});
