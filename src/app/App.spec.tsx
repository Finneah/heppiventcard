/**
 * @format
 */

import 'react-native';
import * as React from 'react';
import App from './App';

// Note: test renderer must be required after react-native.
import {render} from '@testing-library/react-native';

describe('APP', () => {
  test('renders correctly', () => {
    const app = render(<App />);

    expect(app.toJSON()).toMatchSnapshot();
  });
});
