/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import HomeScreen from '../src/screens/HomeScreen';
jest.mock('rn-tourguide', () => {
  return {
    TourGuideProvider: jest.fn().mockImplementation((x) => x),
  };
});
it('HomeScreen renders correctly', () => {
  renderer.create(<HomeScreen />);
});
