import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { CalendarScreen, GastronomiaScreen, HomeScreen, OpcionesScreen, ProfileScreen, PruebaScroll, SearchNearbyLocation, BuscarScreen, 
  AñadirScreen, TodosScreen, VidaNocturnaScreen } from './src/paginas/tabs/';
import { LoginScreen } from './src/paginas/LoginScreen';
import { RegisterScreen } from './src/paginas/RegisterScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (userLoggedIn === 'true') {
        setIsLoggedIn(true); // Si el valor es true, el usuario está logueado
        console.log(`El usuario ${usuario.nick} está logueado`)
      } else {
        setIsLoggedIn(false)
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Perfil" component={ProfileScreen} />
        <Stack.Screen name="Opciones" component={OpcionesScreen} />
        <Stack.Screen name="Calendario" component={CalendarScreen} />
        <Stack.Screen name="PruebaScroll" component={PruebaScroll} />
        <Stack.Screen name="SearchNearbyLocation" component={SearchNearbyLocation} />
        <Stack.Screen name="Buscar" component={BuscarScreen} />
        <Stack.Screen name="Añadir" component={AñadirScreen} />
        <Stack.Screen name ="Todos" component={TodosScreen} />
        <Stack.Screen name ="Gastronomia" component={GastronomiaScreen} />
        <Stack.Screen name="vidaNocturna" component={VidaNocturnaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}