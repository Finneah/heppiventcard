import 'react-native';
import * as React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

// Note: test renderer must be required after react-native.

import {NativeBaseProvider} from 'native-base';
import MainAlertDialog from './MainAlertDialog';

const wrapper = ({children}: any) => (
  <NativeBaseProvider
    initialWindowMetrics={{
      frame: {x: 0, y: 0, width: 0, height: 0},
      insets: {top: 0, left: 0, right: 0, bottom: 0},
    }}>
    {children}
  </NativeBaseProvider>
);

describe('MainAlertDialog', () => {
  test('renders correctly', () => {
    const mainAlertDialog = render(
      <MainAlertDialog
        title="title"
        description="description"
        showAlertDialog={true}
        setShowAlertDialog={jest.fn()}
        okButtonText="okButtonText"
        okButtonCallback={jest.fn()}
      />,
      {wrapper},
    );

    expect(mainAlertDialog.toJSON()).toMatchSnapshot();
  });

  test('FireEvent correctly', () => {
    const {getByText} = render(
      <MainAlertDialog
        title="title"
        description="description"
        showAlertDialog={true}
        setShowAlertDialog={jest.fn()}
        okButtonText="okButtonText"
        okButtonCallback={jest.fn()}
      />,
      {wrapper},
    );

    const cancelButton = getByText('CANCEL');
    expect(cancelButton).toBeTruthy();
    if (cancelButton) {
      fireEvent.press(cancelButton);
    }

    const okButton = getByText('okButtonText');
    expect(okButton).toBeTruthy();
    if (okButton) {
      fireEvent.press(okButton);
    }
  });
});
