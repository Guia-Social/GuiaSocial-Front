import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { CalendarScreen } from './src/paginas/tabs/CalendarScreen';
import { HomeScreen } from './src/paginas/tabs/HomeScreen';
import { OpcionesScreen } from './src/paginas/tabs/OpcionesScreen';
import { ProfileScreen } from './src/paginas/tabs/ProfileScreen';
import { SearchNearbyLocationScreen } from './src/paginas/tabs/SearchNearbyLocationScreen';
import { BuscarScreen } from './src/paginas/tabs/BuscarScreen';
import { CategoriaEventoScreen } from './src/paginas/tabs/CategoriaEventoScreen';
import { EventoScreen } from './src/paginas/tabs/EventoScreen';
import { LoginScreen } from './src/paginas/LoginScreen';
import { RegisterScreen } from './src/paginas/RegisterScreen';
import { EventosDelDiaScreen } from './src/paginas/tabs/EventosDelDiaScreen';
import { AnadirScreen } from './src/paginas/tabs/AnadirScreen';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (userLoggedIn === 'true') {
        setIsLoggedIn(true); // Si el valor es true, el usuario está logueado
        console.log('El usuario está logueado');
      } else {
        setIsLoggedIn(false);
      }
    };
  
    checkLoginStatus();
  }, []); // Solo se ejecuta una vez cuando el componente se monta
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Perfil" component={ProfileScreen} />
        <Stack.Screen name="Opciones" component={OpcionesScreen} />
        <Stack.Screen name="Calendario" component={CalendarScreen} />
        <Stack.Screen name="SearchNearbyLocation" component={SearchNearbyLocationScreen} />
        <Stack.Screen name="Buscar" component={BuscarScreen} />
        <Stack.Screen name="categoriaEventoScreen" component={CategoriaEventoScreen} />
        <Stack.Screen name="EventosDelDia" component={EventosDelDiaScreen} />
        <Stack.Screen name="EventoScreen" component={EventoScreen} />
        <Stack.Screen name="Añadir" component={AnadirScreen} />
        <Stack.Screen name="Anadir" component={AnadirScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}