import {Root, StyleProvider} from 'native-base';
import React from 'react';

import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import {NavigationContainer} from '@react-navigation/native';

import {TourGuideProvider} from 'rn-tourguide';
import Navigation from './src/AppNavigator';

const App = () => {
  return (
    <TourGuideProvider {...{borderRadius: 16}}>
      <StyleProvider style={getTheme(platform)}>
        <Root>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </Root>
      </StyleProvider>
    </TourGuideProvider>
  );
};

export default App;
