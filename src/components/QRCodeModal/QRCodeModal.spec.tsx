/**
 * @format
 */

import 'react-native';
import * as React from 'react';

import {render} from '@testing-library/react-native';
import QRCodeModal from './QRCodeModal';
import {SectionPart, StampType} from '../../Helper/Types';
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
describe('QRCodeModal', () => {
  test('renders correctly', () => {
    let stampCard: SectionPart = {
      id: 'string',
      title: 'string',
      complete: false,
      date_of_creation: new Date(),
      date_of_completed: undefined,
      completed_image: undefined,
      content: [],
    };
    let stamp: StampType = {
      number: 1,
      name: undefined,
      image: undefined,
      done: false,
      picture: undefined,
      date: new Date(),
      description: 'string',
      stampCard: stampCard,
    };
    const qrCodeModalTest = render(
      <QRCodeModal
        stamp={stamp}
        index={0}
        stampCard={stampCard}
        _onSuccessReadQRCodeCallback={(result: any) => console.log(result)}
      />,
      {wrapper},
    );
    expect(qrCodeModalTest.toJSON()).toMatchSnapshot();
  });
});
