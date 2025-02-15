import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { CalendarScreen, GastronomiaScreen, HomeScreen, OpcionesScreen, ProfileScreen, SearchNearbyLocationScreen, BuscarScreen, 
  AñadirScreen, VidaNocturnaScreen, EventoScreen } from './src/paginas/tabs/';
import { TurismoScreen } from './src/paginas/tabs/TurismoScreen';
import { MusicaScreen } from './src/paginas/tabs/MusicaScreen';
import { TeatroYEspectaculoScreen } from './src/paginas/tabs/TeatroYEspectaculoScreen';
import { LoginScreen } from './src/paginas/LoginScreen';
import { RegisterScreen } from './src/paginas/RegisterScreen';
import { EventosDelDiaScreen } from './src/paginas/tabs/EventosDelDiaScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (userLoggedIn === 'true') {
        setIsLoggedIn(true); // Si el valor es true, el usuario está logueado
        console.log(`El usuario está logueado`);
      } else {
        setIsLoggedIn(false);
      }
    };
  
    checkLoginStatus();
  }, []); // Solo se ejecuta una vez cuando el componente se monta
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Perfil" component={ProfileScreen} />
        <Stack.Screen name="Opciones" component={OpcionesScreen} />
        <Stack.Screen name="Calendario" component={CalendarScreen} />
        <Stack.Screen name="SearchNearbyLocation" component={SearchNearbyLocationScreen} />
        <Stack.Screen name="Buscar" component={BuscarScreen} />
        <Stack.Screen name="Añadir" component={AñadirScreen} />
        <Stack.Screen name ="Gastronomia" component={GastronomiaScreen} />
        <Stack.Screen name="vidaNocturna" component={VidaNocturnaScreen} />
        <Stack.Screen name="turismo" component={TurismoScreen} />
        <Stack.Screen name="musica" component={MusicaScreen} />
        <Stack.Screen name="teatroYEspectaculo" component={TeatroYEspectaculoScreen} />
        <Stack.Screen name="EventosDelDia" component={EventosDelDiaScreen} />
        <Stack.Screen name="EventoScreen" component={EventoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}