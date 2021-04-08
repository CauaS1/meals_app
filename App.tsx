import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { MealsProvider } from './src/contexts/MealsContext';
import { Meals } from './src/screen/Meals';
import { TrackDetails } from './src/screen/TrackDetails';
import { Profile } from './src/screen/Profile';

import Feather from 'react-native-vector-icons/Feather';
import { Community } from './src/screen/Community';
import { Form } from './src/screen/Form';
import { Initial } from './src/screen/Initial';
import { Register } from './src/screen/Register';
import { Login } from './src/screen/Login';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function Bottom() {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#f7f7f7' }}
      inactiveColor="#cacace"
      activeColor="#00c49a"
    >
      <Tab.Screen name="Meals" component={Meals}  options={{
        tabBarIcon: ({ color }) => (
          <Feather name="home" size={24} color={color} />
        )
      }} />
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({ color }) => (
          <Feather name="user" size={24} color={color} />
        )
      }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <MealsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Initial" component={Initial} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />



          <Stack.Screen name="Home" component={Bottom} />
          <Stack.Screen name="TrackDetails" component={TrackDetails} />
          <Stack.Screen name="Community" component={Community} />
          <Stack.Screen name="Form" component={Form} />
        </Stack.Navigator>
      </NavigationContainer>
    </MealsProvider>
  );
}
