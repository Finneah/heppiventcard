import 'react-native';
import * as React from 'react';
import {render} from '@testing-library/react-native';

import MemberCard from './MemberCard';
import {NativeBaseProvider} from 'native-base';

const wrapper = ({children}: any) => (
  <NativeBaseProvider
    initialWindowMetrics={{
      frame: {x: 0, y: 0, width: 0, height: 0},
      insets: {top: 0, left: 0, right: 0, bottom: 0},
    }}>
    {children}
  </NativeBaseProvider>
);

describe('MemberCard', () => {
  test('renders correctly', () => {
    const memberCard = render(<MemberCard />, {wrapper});
    expect(memberCard.toJSON()).toMatchSnapshot();
  });

  test('userNameHeading is NAME_PLACEHOLDER ', () => {
    const {getByText} = render(<MemberCard />, {wrapper});
    const userNameHeading = getByText('NAME_PLACEHOLDER');
    expect(userNameHeading).toBeTruthy();
  });
  test("helloHeading is HELLO + ' '", () => {
    const {getByText} = render(<MemberCard />, {wrapper});
    const helloHeading = getByText('HELLO' + ' ');
    expect(helloHeading).toBeTruthy();
  });

  // test('validate User', () => {
  //   var validUser = isValidUser({name: 'XY', rank: 0});
  //   expect(validUser).toBeTruthy();

  //   // const mockCallback = jest.fn((x) => 42 + x);
  //   // util.forEach([0, 1], mockCallback);
  // });
});
