import {Root, StyleProvider} from 'native-base';
import React from 'react';

import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';

import {createStackNavigator} from '@react-navigation/stack';
import {strings} from './src/i18n';
import {TourGuideProvider} from 'rn-tourguide';

const Stack = createStackNavigator();

const App = () => {
  return (
    <TourGuideProvider {...{borderRadius: 16}}>
      <StyleProvider style={getTheme(platform)}>
        <Root>
          <NavigationContainer>
            <Stack.Navigator headerMode="none">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerTitle: strings('APPTITLE'),
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Root>
      </StyleProvider>
    </TourGuideProvider>
  );
};

export default App;
