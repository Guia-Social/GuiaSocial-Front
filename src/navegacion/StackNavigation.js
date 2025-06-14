import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../paginas/LoginScreen';
import { RegisterScreen } from '../paginas/RegisterScreen';
import { HomeScreen } from '../paginas/tabs/HomeScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
