/**
 * @format
 */

import 'react-native';
import * as React from 'react';

import {render} from '@testing-library/react-native';

import {SectionPart, StampCardType, StampType} from '../../Helper/Types';
import {NativeBaseProvider} from 'native-base';
import StampCard from './StampCard';

const wrapper = ({children}: any) => (
  <NativeBaseProvider
    initialWindowMetrics={{
      frame: {x: 0, y: 0, width: 0, height: 0},
      insets: {top: 0, left: 0, right: 0, bottom: 0},
    }}>
    {children}
  </NativeBaseProvider>
);
describe('StampCard', () => {
  test('renders correctly', () => {
    let stampCard: StampCardType = {
      title: 'string',
      complete: false,
      date_of_creation: new Date(),
      date_of_completed: undefined,
      completed_image: undefined,
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

    let content: StampType[] = [stamp];
    let item: SectionPart = {
      id: 'string',
      title: 'string',
      complete: false,
      date_of_creation: new Date(),
      date_of_completed: undefined,
      completed_image: 'string',
      content: content,
    };

    const stampCardTest = render(<StampCard item={item} />, {wrapper});
    expect(stampCardTest.toJSON()).toMatchSnapshot();
  });
});
