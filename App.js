import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { CalendarScreen } from './src/paginas/tabs/CalendarScreen';
import { GastronomiaScreen } from './src/paginas/tabs/GastronomiaScreen';
import { HomeScreen } from './src/paginas/tabs/HomeScreen';
import { OpcionesScreen } from './src/paginas/tabs/OpcionesScreen';
import { ProfileScreen } from './src/paginas/tabs/ProfileScreen';
import { SearchNearbyLocationScreen } from './src/paginas/tabs/SearchNearbyLocationScreen';
import { BuscarScreen } from './src/paginas/tabs/BuscarScreen';
import { VidaNocturnaScreen } from './src/paginas/tabs/VidaNocturnaScreen';
import { EventoScreen } from './src/paginas/tabs/EventoScreen';
import { CalendarScreen, GastronomiaScreen, HomeScreen, OpcionesScreen, ProfileScreen, SearchNearbyLocation, BuscarScreen,  VidaNocturnaScreen } from './src/paginas/tabs/';
import { TurismoScreen } from './src/paginas/tabs/TurismoScreen';
import { MusicaScreen } from './src/paginas/tabs/MusicaScreen';
import { TeatroYEspectaculoScreen } from './src/paginas/tabs/TeatroYEspectaculoScreen';
import { LoginScreen } from './src/paginas/LoginScreen';
import { RegisterScreen } from './src/paginas/RegisterScreen';
import { EventosDelDiaScreen } from './src/paginas/tabs/EventosDelDiaScreen';
import { AnadirScreen } from './src/paginas/tabs/AnadirScreen';

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
        <Stack.Screen name ="Gastronomia" component={GastronomiaScreen} />
        <Stack.Screen name="vidaNocturna" component={VidaNocturnaScreen} />
        <Stack.Screen name="turismo" component={TurismoScreen} />
        <Stack.Screen name="musica" component={MusicaScreen} />
        <Stack.Screen name="teatroYEspectaculo" component={TeatroYEspectaculoScreen} />
        <Stack.Screen name="EventosDelDia" component={EventosDelDiaScreen} />
        <Stack.Screen name="EventoScreen" component={EventoScreen} />
        <Stack.Screen name="Añadir" component={AnadirScreen} />
        <Stack.Screen name="Anadir" component={AnadirScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}