import {Root, StyleProvider} from 'native-base';
import React from 'react';

import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <StyleProvider style={getTheme(material)}>
      <Root>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerTitle: 'Heppiventcard',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </StyleProvider>
  );
};

export default App;
