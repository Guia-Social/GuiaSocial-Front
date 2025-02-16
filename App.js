import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// ✅ Importaciones de pantallas
import { CalendarScreen, HomeScreen, OpcionesScreen, ProfileScreen, BuscarScreen, GastronomiaScreen, VidaNocturnaScreen } from './src/paginas/tabs/';
import { TurismoScreen } from './src/paginas/tabs/TurismoScreen';
import { MusicaScreen } from './src/paginas/tabs/MusicaScreen';
import { TeatroYEspectaculoScreen } from './src/paginas/tabs/TeatroYEspectaculoScreen';
import { LoginScreen } from './src/paginas/LoginScreen';
import { RegisterScreen } from './src/paginas/RegisterScreen';
import { EventosDelDiaScreen } from './src/paginas/tabs/EventosDelDiaScreen';
import { AnadirScreen } from './src/paginas/tabs/AnadirScreen';
import { EventoScreen } from './src/paginas/tabs/EventoScreen';

// ✅ Importación corregida de SearchNearbyLocationScreen (asegúrate de que el archivo existe)
import SearchNearbyLocationScreen from './src/paginas/tabs/SearchNearbyLocationScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(userLoggedIn === 'true');
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Perfil" component={ProfileScreen} />
        <Stack.Screen name="Opciones" component={OpcionesScreen} />
        <Stack.Screen name="Calendario" component={CalendarScreen} />
        <Stack.Screen name="Buscar" component={BuscarScreen} />
        <Stack.Screen name="Gastronomia" component={GastronomiaScreen} />
        <Stack.Screen name="VidaNocturna" component={VidaNocturnaScreen} />
        <Stack.Screen name="Turismo" component={TurismoScreen} />
        <Stack.Screen name="Musica" component={MusicaScreen} />
        <Stack.Screen name="TeatroYEspectaculo" component={TeatroYEspectaculoScreen} />
        <Stack.Screen name="EventosDelDia" component={EventosDelDiaScreen} />
        <Stack.Screen name="EventoScreen" component={EventoScreen} />
        <Stack.Screen name="Añadir" component={AnadirScreen} />

        {/* ✅ Corrección aquí: Asegurar que este componente es válido */}
        <Stack.Screen name="SearchNearbyLocation" component={SearchNearbyLocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
