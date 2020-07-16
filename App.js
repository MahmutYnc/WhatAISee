// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/HomeScreen';
import Cam from './screens/CameraScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          screenOptions={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Cam" component={Cam} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
