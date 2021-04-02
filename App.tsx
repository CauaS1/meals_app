import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { MealsProvider } from './src/contexts/MealsContext';
import { Meals } from './src/screen/Meals';
import { TrackDetails } from './src/screen/TrackDetails';
import { Profile } from './src/screen/Profile';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function Bottom() {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#f7f7f7' }}
    >
      <Tab.Screen name="Meals" component={Meals} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <MealsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Bottom} />
          <Stack.Screen name="TrackDetails" component={TrackDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </MealsProvider>
  );
}
