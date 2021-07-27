import 'react-native';
import * as React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

// Note: test renderer must be required after react-native.

import {NativeBaseProvider} from 'native-base';

import EditNameAlertDialog from './EditNameAlertDialog';
import {UserType} from '../../Helper/Types';
import MockUserModel from './../../../__mock__/MockUserModel';
// let mockUserModel = new MockUserModel();
let baseUser: UserType = {
  name: 'Jenni',
  rank: 0,
};

jest.mock('./../../../__mock__/MockUserModel.ts', () => MockUserModel);
const wrapper = ({children}: any) => (
  <NativeBaseProvider
    initialWindowMetrics={{
      frame: {x: 0, y: 0, width: 0, height: 0},
      insets: {top: 0, left: 0, right: 0, bottom: 0},
    }}>
    {children}
  </NativeBaseProvider>
);

describe('MainAlert', () => {
  test('renders correctly', () => {
    const editNameAlertDialog = render(
      <EditNameAlertDialog
        user={baseUser}
        showAlertDialog={true}
        setShowAlertDialog={jest.fn()}
      />,
      {
        wrapper,
      },
    );

    expect(editNameAlertDialog.toJSON()).toMatchSnapshot();
  });
  test('FireEvent correctly', () => {
    const {getByText, getByPlaceholderText} = render(
      <EditNameAlertDialog
        user={baseUser}
        showAlertDialog={true}
        setShowAlertDialog={jest.fn()}
      />,
      {wrapper},
    );

    const saveButton = getByText('SAVE');
    expect(saveButton).toBeTruthy();
    if (saveButton) {
      fireEvent.press(saveButton);
    }
    const input = getByPlaceholderText('Anzeigename');
    expect(input).toBeTruthy();
    if (input) {
      fireEvent.changeText(input, 'Jenni');
    }
  });
});
