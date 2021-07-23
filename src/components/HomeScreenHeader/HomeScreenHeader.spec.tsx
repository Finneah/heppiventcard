import {NativeBaseProvider} from 'native-base';
import * as React from 'react';

import {render, fireEvent} from '@testing-library/react-native';

import HomeScreenHeader, {util} from './HomeScreenHeader';

const wrapper = ({children}: any) => (
  <NativeBaseProvider
    initialWindowMetrics={{
      frame: {x: 0, y: 0, width: 0, height: 0},
      insets: {top: 0, left: 0, right: 0, bottom: 0},
    }}>
    {children}
  </NativeBaseProvider>
);

describe('HomeScreenHeader', () => {
  test('renders correctly', () => {
    const homeScreenHeader = render(<HomeScreenHeader />, {wrapper});
    expect(homeScreenHeader.toJSON()).toMatchSnapshot();
  });

  test('Header Title ', () => {
    const {getByText} = render(<HomeScreenHeader />, {wrapper});
    const header = getByText('APPTITLE');
    expect(header).toBeTruthy();
  });

  test('Pressable fireEvent correctly ', () => {
    const {queryByTestId} = render(<HomeScreenHeader />, {wrapper});
    const foundElement = queryByTestId('pressableLogo');
    expect(foundElement).toBeTruthy();
    if (foundElement) {
      fireEvent.press(foundElement);
    }
  });

  test('onPressLogo function works correctly', async () => {
    render(<HomeScreenHeader />, {wrapper});

    expect(await util.onPressLogo('http://heppivents.de/')).toBeUndefined();

    expect(await util.onPressLogo()).toBeFalsy();
  });
});
